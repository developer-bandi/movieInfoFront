function imagePreload(url: string | null): void {
  const img: HTMLImageElement = new Image();
  img.src = `https://image.tmdb.org/t/p/w500${url}`;
}

export default imagePreload;
