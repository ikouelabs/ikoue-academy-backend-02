import { describe, expect, test } from "bun:test";
import request from "supertest";
import app from "../../app/server";

describe("Get todos", () => {
	test("should return 200", async () => {
		const response = await request(app).get("/todos");
		expect(response.status).toBe(200);
	});
});

describe("	 todo", () => {
	test("should return 200", async () => {
		const response = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		expect(response.status).toBe(200);
	});
});
