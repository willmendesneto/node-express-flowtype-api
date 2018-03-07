import request from 'supertest-as-promised';
import Api from '../src/Api';

const app = new Api().express;

describe('Flow API', () => {

  describe('GET /api/v1/products - get all produce', () => {

    const expectedProps = ['id', 'name', 'quantity', 'price'];

    it('should return JSON array', () => {
      return request(app).get('/api/v1/products')
      .expect(200)
      .then(res => {
        // check that it sends back an array
        expect(res.body).toBeInstanceOf(Array);
      });
    });
    it('should return objs w/ correct props', () => {
      return request(app).get('/api/v1/products')
      .expect(200)
      .then(res => {
        // check for the expected properties
        const sampleKeys = Object.keys(res.body[0]);
        expectedProps.forEach((key) => {
          expect(sampleKeys.includes(key)).toBe(true);
        });
      });
    });

    it('shouldn\'t return objs w/ extra props', () => {
      return request(app).get('/api/v1/products')
      .expect(200)
      .then(res => {
        // check for only expected properties
        const extraProps = Object.keys(res.body[0]).filter(key => (
          !expectedProps.includes(key)
        ));

        expect(extraProps.length).toBe(0);
      });
    });

  });

  describe('GET /api/v1/products/:id - get produce item by id', () => {

    it('should return an obj of type Produce', () => {
      return request(app).get('/api/v1/products/1')
      .expect(200)
      .then((res) => {
        const reqKeys = ['id', 'name', 'price', 'quantity'];
        const { item } = res.body;
        // check it has correct keys
        reqKeys.forEach((key) => {
          expect(Object.keys(item)).toContain(key);
        });
        // check type of each field
        expect(typeof item.id).toBe('number');
        expect(typeof item.name).toBe('string');
        expect(typeof item.quantity).toBe('number');
        expect(typeof item.price).toBe('number');
      });
    });

    it('should return a Produce w/ requested id', () => {
      return request(app).get('/api/v1/products/1')
      .expect(200)
      .then((res) => {
        expect(res.body.item).toEqual({
          id: 1,
          name: 'banana',
          quantity: 15,
          price: 1
        });
      });
    });

    it('should 400 on a request for a nonexistant id', () => {
      request(app).get('/api/v1/products/-32')
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('No item found with id: -32');
      });
    });
  });

  describe('POST /api/v1/products - create new item', () => {
    const peach = {
      name: 'peach',
      quantity: 10,
      price: 6
    };

    it('should accept and add a valid new item', () => {
      return request(app).post('/api/v1/products')
      .send(peach)
      .then((res) => {
        expect(res.body.status).toBe(200);

        request(app).get('/api/v1/products')
        .then((res) => {
          const returnedPeach = res.body.find(item => item.name === 'peach');
          expect(res.status).toBe(200);
          expect(returnedPeach.quantity).toBe(10);
          expect(returnedPeach.price).toBe(6);
        })
      })
    });

    it('should reject post w/o name, price, or quantity', () => {
      const badItems = [
        {
          name: peach.name,
          quantity: peach.quantity
        },
        {
          quantity: peach.quantity,
          price: peach.price
        },
        {
          name: peach.name,
          price: peach.price
        }
      ];
      badItems.forEach(badItem => {
        request(app).post('/api/v1/products')
        .send(badItem)
        .then((res) => {
          expect(res.body.status).toBe(400);
          expect(res.body.message.startsWith('Bad Request')).toBe(true);
        });
      });
    });
  });

  it('allows updates to props other than id', () => {
    request(app).put('/api/v1/products/1')
      .send({ quantity: 20 })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.item.quantity).toBe(20);
      });
  });

  describe('PUT /api/v1/products/:id - update an item', () => {
    it('allows updates to props other than id', () => {
      request(app).put('/api/v1/products/1')
      .send({ quantity: 20 })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.item.quantity).toBe(20);
      });
    });
    it('rejects updates to id prop', () => {
      request(app).put('/api/v1/products/1')
      .send({ id: 10 })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.message.startsWith('Update failed')).toBe(true);
      });
    });
  });

  describe('DELETE /api/v1/products/:id - delete an item', () => {

    it('deletes when given a valid ID', () => {
      request(app).delete('/api/v1/products/4')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.deleted.id).toBe(4);
      });
    });

    it('responds w/ error if given invalid ID', () => {
      [-2, 100].forEach((id) => {
        request(app).delete(`/api/v1/products/${id}`)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.message).toBe('No item found with given ID.');
        });
      });
    });

  });

});
