import dotenv from 'dotenv'
dotenv.config();
export const explorePopularRepos = async (req, res) => {
  const { language } = req.params;
  console.log("language", language);
  console.log(process.env.VITE_GITHUB_API_KEY)
  try {
			const exploreRepos = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{headers:{
				authorization: `token ${process.env.VITE_GITHUB_API_KEY}`
			}});
			const data = await exploreRepos.json();
            console.log("data", data);
            res.status(200).json({repos :data.items});
		} catch (error) {
			res.status(500).json({ error: error.message });
		} 
}