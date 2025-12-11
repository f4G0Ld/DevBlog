"use client";

import { useQuery } from "@tanstack/react-query";
import { posts } from "../lib/db/schema";
import { api } from "@/api";
import { useState } from "react";

type post = {
	id: string;
	title: string;
	name: string;
	description: string;
	likes: number | null;
	comments: number | null;
	createdAt: Date;
};

export function PostCard({ post }: { post: post }) {
	const [showComments, setShowComments] = useState(false);

	const formattedDate = new Date(post.createdAt).toLocaleString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	const { data: comments, isLoading } = useQuery({
		queryKey: ["comments", post.id],
		queryFn: async () => {
			const { data, error } = await api.comments.get({
				query: { postId: post.id },
			});
			if (error) throw new Error(String(error.status));
			return data;
		},
		enabled: showComments,
	});

	return (
		<div>
			<p>{post.title}</p>
			<p>{post.name}</p>
			<p>{post.createdAt.toLocaleDateString()}</p>
			<p>{post.description}</p>
			<p>{post.likes}</p>
			<p>{post.comments}</p>
		</div>
	);
}
