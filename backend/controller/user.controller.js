import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const getUserProfileAndRepos = async (req, res) => {
	try {
		const { username } = req.params;

		const userRes = await fetch(
			`https://api.github.com/users/${username}`,
			{
				headers: {
					authorization: `token ${process.env.VITE_GITHUB_API_KEY}`,
				},
			}
		);

		const userProfile = await userRes.json();

		const reposRes = await fetch(userProfile.repos_url, {
			headers: {
				authorization: `token ${process.env.VITE_GITHUB_API_KEY}`,
			},
		});

		const repos = await reposRes.json();

		res.status(200).json({
			userProfile,
			repos,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

export const likeProfile = async (req, res) => {
	try {
		const { username } = req.params;

		if (!req.user) {
			return res.status(401).json({
				error: "Unauthorized",
			});
		}

		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({
				error: "Authenticated user not found",
			});
		}

		const userToLike = await User.findOne({
			username,
		});

		if (!userToLike) {
			return res.status(404).json({
				error: "User is not a member",
			});
		}

		if (user.username === userToLike.username) {
			return res.status(400).json({
				error: "You cannot like yourself",
			});
		}

		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({
				error: "User already liked",
			});
		}

		userToLike.likedBy.push({
			username: user.username,
			avatarUrl: user.avatarUrl,
			likedDate: Date.now(),
		});

		user.likedProfiles.push(userToLike.username);

		await Promise.all([
			user.save(),
			userToLike.save(),
		]);

		res.status(200).json({
			message: "User liked successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

export const getLikes = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				error: "Unauthorized",
			});
		}

		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		res.status(200).json({
			likedBy: user.likedBy,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};