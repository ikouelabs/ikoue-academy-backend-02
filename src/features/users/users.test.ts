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

	test("authentification - cas nominal - happy path", async () => {
		const email = faker.internet.email();
		const password = faker.internet.password();
		//
		let response = await request(app).post("/users").send({
			email: email,
			password: password,
		});
		expect(response.status).toBe(201);

		response = await request(app).post("/users/login").send({
			email: email,
			password: password,
		});
		expect(response.status).toBe(200);
	});

	test("authentification - invalid credentials", async () => {
		const email = faker.internet.email();
		const password = faker.internet.password();
		//
		let response = await request(app).post("/users").send({
			email: email,
			password: password,
		});
		expect(response.status).toBe(201);

		response = await request(app).post("/users/login").send({
			email: email,
			password: "45373",
		});
		expect(response.status).toBe(401);

		response = await request(app).post("/users/login").send({
			email: faker.internet.email(), // utiliser une autre adresse email
			password: password,
		});
		expect(response.status).toBe(401);
	});

	test("suppression d'un utilisateur sans authentification", async () => {
		const response = await request(app).delete("/users/12345678");
		expect(response.status).toBe(401);
	});

	test("suppression d'un utilisateur", async () => {
		const email1 = faker.internet.email();
		const password1 = faker.internet.password();
		// Créer un utilisateur
		const user1 = await request(app).post("/users").send({
			email: email1,
			password: password1,
		});
		const user1Id = user1.body.id;
		expect(user1.status).toBe(201);
		expect(user1Id).toBeDefined();
		expect(user1.body.email).toBeDefined();

		// Se connecter pour récupérer un token
		const user1Login = await request(app).post("/users/login").send({
			email: email1, // utiliser une autre adresse email
			password: password1,
		});
		expect(user1Login.status).toBe(200);
		expect(user1Login.body.token).toBeDefined();
		const jwtToken = user1Login.body.token;

		// Supprimer l'utilisateur
		const response = await request(app)
			.delete("/users/21542514251")
			.set("Authorization", `Bearer ${jwtToken}`);
		expect(response.status).toBe(401);
	});
});
