export function shouldUnoptimizeImage(src: string) {
  return src.includes(".supabase.co/storage/v1/object/public/");
}
