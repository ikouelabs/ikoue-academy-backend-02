import { describe, expect, test } from "bun:test";
import request from "supertest";
import app from "../../app/server";

describe("Get todos", () => {
	test("should return 200", async () => {
		const response = await request(app).get("/todos");
		expect(response.status).toBe(200);
	});
});

describe("Get single todo", () => {
	test("should return 404 when not found", async () => {
		const response = await request(app).get("/todos/123456");
		expect(response.status).toBe(404);
	});

	test("should return 200 when found", async () => {
		const todo = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		const response = await request(app).get(`/todos/${todo.body.id}`);
		expect(response.status).toBe(200);
	});
});

describe("Create todo", () => {
	test("should return 200", async () => {
		const response = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		expect(response.status).toBe(200);
	});
});

describe("Delete a todo", () => {
	test("should return 200", async () => {
		const todo = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		const response = await request(app).delete(`/todos/${todo.body.id}`);
		expect(response.status).toBe(204);
	});
});

describe("Update a todo", () => {
	test("should return 200", async () => {
		const todo = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		const response = await request(app).put(`/todos/${todo.body.id}`).send({
			title: "Updated todo",
			description: "Updated description",
		});
		expect(response.status).toBe(200);
	});
});
