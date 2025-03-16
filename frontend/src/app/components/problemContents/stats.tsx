'use client'
import { useEffect, useState } from "react";
import axios from "axios";

const SubmissionStats = ({ problemId }: { problemId: string }) => {
	const [stats, setStats] = useState({ total: 0, accepted: 0 });

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const res = await axios.get(`/api/submissions/stats/${problemId}`);
				if(res.data.success) setStats(res.data.stats);
			} catch (error) {
				console.error("Error fetching submission stats:", error);
			}
		};

		fetchStats();
	}, [problemId]);

	return (
		<div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4 w-full mt-8 mx-auto">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Submission Stats</h3>
			<div className="flex justify-between mt-2">
				<div className="text-center">
					<p className="text-xl font-bold text-blue-600">{stats.total}</p>
					<p className="text-sm text-gray-600 dark:text-gray-300">Total Submissions</p>
				</div>
				<div className="text-center">
					<p className="text-xl font-bold text-green-600">{stats.accepted}</p>
					<p className="text-sm text-gray-600 dark:text-gray-300">Accepted Submissions</p>
				</div>
			</div>
		</div>
	);
};

export default SubmissionStats;
