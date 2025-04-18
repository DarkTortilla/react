import request from "supertest";
import server, {connectDB} from "../../server";
import db from "../../config/db";


describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });

  it("should validate that the price is a number and greater that 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Firus",
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should create a new producte", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: 50,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(400);

    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  it("GET a JSON response whit products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.body.data).not.toHaveProperty("errors");
  });
});

describe("GET /api/products:/id", () => {
  it("Should return a 404  response for a non-existent product", async () => {
    const productId = 6913;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
  it("should check a valid ID in the URL", async () => {
    const response = await request(server).get("/api/products/not-valid-URL");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });
  it("get  a JSON rsponse for a single product", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  it("should display validarion error messages when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy;
    expect(response.body.errors).toHaveLength(5);
    expect(response.body).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should validate that price is greater thant 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "monitor curvo",
      availability: true,
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.error).toBeTruthy;

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put("/api/products/not-valid-url")
      .send({
        name: "monitor curvo",
        availability: true,
        price: 50,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  it("Should return a 404  response for a non-existent product", async () => {
    const productId = 6913;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "monitor curvo",
        availability: true,
        price: 50,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("Should update a product with valid data", async () => {
    const response = await request(server).put(`/api/products/1`).send({
        name: "monitor curvo",
        availability: true,
        price: 50
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  },25000);
});

describe('PATCH /api/products/:id', ()=>{
  it('Should retun a 404 response for a non-existen product', async ()=>{
    const productId=2000;
    const response= await request(server).patch(`/api/products/${productId}`)

    expect(response.status).toBe(404);
    expect(response.body).not.toHaveProperty('data')
  })

  it('Should update a availability', async ()=>{
    const response= await request(server).patch(`/api/products/1`)

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('data')
  })

})

describe('DELETE /api/products:id', ()=>{
  it("should check a valid ID", async () => {
    const response = await request(server)
      .delete("/api/products/not-valid-url")
 

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  it("Should return a 404  response for a non-existent product", async () => {
    const productId = 6913;
    const response = await request(server).delete(`/api/products/${productId}`)
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it('should delete a product', async ()=>{
    const response =await request(server).delete('/api/products/1');
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

jest.mock('../../config/db')

describe('connectDB', ()=>{
  it('should handle database connection error', async ()=>{
    jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Firus error en la base de datos'))

    const consoleSpy = jest.spyOn(console, 'log')

    await connectDB()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Firus error en la base de datos')
    )
  })
})
