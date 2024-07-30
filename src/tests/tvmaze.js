import request from 'supertest';
import app from '../server.js';
import { getShow } from '../lib/tvmaze.js';
import {expect} from 'chai';

describe("getShow", () => {
  it("should return a show with cast sorted by birthday descending", async () => {
    const show = await getShow(1);
    expect(show).to.have.property('id');
    expect(show.id).to.be.a('number');
    expect(show).to.have.property('name');
    expect(show.name).to.be.a('string');
    expect(show).to.have.property('cast');
    expect(show.cast).to.be.an('array');

    const dates = show.cast.map(cast => cast.birthday);
    for (let i = 0; i < dates.length - 1; i++) {
      expect(new Date(dates[i]).getTime()).to.be.at.least(new Date(dates[i + 1]).getTime());
    }
  });
});

describe('GET /shows/1', () => {
  it('show return a show, cast should be ordered by birthday descending', (done) => {
    request(app)
      .get('/shows/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property('id');
        expect(res.body.id).to.be.a('number');
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.be.a('string');
        expect(res.body).to.have.property('cast');
        expect(res.body.cast).to.be.an('array');

        const dates = res.body.cast.map(cast => cast.birthday);
        for (let i = 0; i < dates.length - 1; i++) {
          expect(new Date(dates[i]).getTime()).to.be.at.least(new Date(dates[i + 1]).getTime());
        }
        return done();  
      });
  });
  
});