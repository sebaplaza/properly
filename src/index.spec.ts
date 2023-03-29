import { listProperties } from ".";

import { describe, test, expect } from "vitest";

describe("deep keys", () => {
	test("should return properties", () => {
		const data = {
			name: "seba",
			age: 39,
			friends: ["mario", "pepe"],
			address: {
				street: "figuiers",
				number: 9,
				city: {
					postalCode: 56700,
					name: "HENNEBONT",
				},
			},
		};
		const result = listProperties(data, { leading: false });
		expect(result).toStrictEqual([
			{ path: "name", value: "seba" },
			{ path: "age", value: 39 },
			{
				path: "friends",
				value: ["mario", "pepe"],
			},
			{
				path: "friends.0",
				value: "mario",
			},
			{
				path: "friends.1",
				value: "pepe",
			},
			{
				path: "address",
				value: {
					street: "figuiers",
					number: 9,
					city: {
						postalCode: 56700,
						name: "HENNEBONT",
					},
				},
			},
			{ path: "address.street", value: "figuiers" },
			{ path: "address.number", value: 9 },
			{
				path: "address.city",
				value: {
					postalCode: 56700,
					name: "HENNEBONT",
				},
			},
			{
				path: "address.city.postalCode",
				value: 56700,
			},
			{
				path: "address.city.name",
				value: "HENNEBONT",
			},
		]);
	});
});
