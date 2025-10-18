import { describe, expect, test } from "bun:test";
import request from "supertest";
import app from "../../app/server";

describe("Status", () => {
	test("should return 200", async () => {
		const response = await request(app).get("/status");
		expect(response.status).toBe(200);
	});
});
