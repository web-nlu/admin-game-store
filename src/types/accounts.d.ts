type Account = {
  id: number,
  title: string,
  price: number,
  category: string,
  categoryId: number,
  gameId: number,
  image: string,
  info: string,
  game: string
}

type AccountDetail = {
  id: number,
  title: string,
  price: number,
  salePrice: number,
  category: string ,
  image: string,
  info: string,
  game: string
  server: string,
  imageGallery: string[],
  description: string,
  features: string[],
  level: number,
  status: string,
  warranty: string
  createdAt: string,
  updatedAt: string,
  viewCount: number,
  saleCount: number,
  tags: string[],
  rating: number,
  reviews: Review[],
}