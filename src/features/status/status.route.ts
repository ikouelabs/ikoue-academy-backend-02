import { type Request, type Response, Router } from "express";

const router = Router();

router.get("/", (_: Request, res: Response) => {
	res.status(200).json({
		status: "UP",
		message: "Server is running",
		components: {
			database: {
				status: "UP",
				message: "Database is running",
			},
			cache: {
				status: "UP",
				message: "Cache is running",
			},
		},
	});
});

export default router;
