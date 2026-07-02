import dotenv from "dotenv";
dotenv.config();
export const getUserProfileAndRepos = async (req, res) => {
    const {username} = req.params;
    console.log(process.env.VITE_GITHUB_API_KEY)
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`,{headers:{
				authorization: `token ${process.env.VITE_GITHUB_API_KEY}`
			}});
			const  userProfile  = await userRes.json();
			
			const reposRes = await fetch(userProfile.repos_url,{headers:{
				authorization: `token ${process.env.VITE_GITHUB_API_KEY}`
			}});
			const repos = await reposRes.json();
			console.log("userprofile", userProfile);
			console.log("repos", repos);
            res.status(200).json({userProfile, repos});
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile and repositories' });
    }
}