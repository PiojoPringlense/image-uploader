import nextConnect from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "DEV",
	},
});

const upload = multer({ storage: storage });

const apiRoute = nextConnect({
	onError(error, req, res) {
		console.log(error);
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(upload.single("theFiles"));

apiRoute.post((req, res) => {
	res.status(200).json({ data: req.file.path });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
