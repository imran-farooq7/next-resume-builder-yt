import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export const uploadThumbnail = async (file: File) => {
	const { data, error } = await supabase.storage
		.from("thumbnails")
		.upload(`public/${file.name}`, file, {
			contentType: "image/png",
			upsert: true,
		});
	if (error) {
		console.log(error.message);
	} else {
		const thumbnailUrl = await getThumbnailUrl(data.path);
		return thumbnailUrl;
	}
};
const getThumbnailUrl = async (path: string) => {
	const { data } = await supabase.storage.from("thumbnails").getPublicUrl(path);
	return data.publicUrl;
};
