import { describe, expect, test } from "bun:test";
import { faker } from "@faker-js/faker";
import request from "supertest";
import app from "../../app/server";

describe("Création d'un utilisateur", () => {
	test("mot de passe trop court", async () => {
		let response = await request(app).post("/users").send({
			email: "test@test.com",
			password: "123456",
		});
		expect(response.status).toBe(400);

		response = await request(app).post("/users").send({
			email: "test@test.com",
			password: "1234567",
		});
		expect(response.status).toBe(400);
	});

	test("email invalide 01", async () => {
		const response = await request(app).post("/users").send({
			email: "caleb01",
			password: "12345678",
		});
		expect(response.status).toBe(400);
	});

	test("email invalide 02", async () => {
		const response = await request(app).post("/users").send({
			email: "ashad02",
			password: "12345678",
		});
		expect(response.status).toBe(400);
	});

	test("create a valid user", async () => {
		const email = faker.internet.email();
		const password = faker.internet.password();
		const response = await request(app).post("/users").send({
			email: email,
			password: password,
		});
		expect(response.status).toBe(201);
		expect(response.body.email).toBe(email);
		expect(response.body.password).not.toBe(password);

		const response2 = await request(app).post("/users").send({
			email: email,
			password: password,
		});
		expect(response2.status).toBe(409);
	});
});
