class Comment {
    constructor(
        public id: number,
        public productId: number,
        public timestamp: string,
        public user: string,
        public rating: number,
        public content: string
    ) {
    }
}

export  const comments = [
    new Comment(1, 1, '2020-07-02', 'Xiao', 4, 'good product quality'),
    new Comment(2, 2, '2020-06-02', 'Xiao', 4.5, 'good product quality1'),
    new Comment(3, 3, '2020-07-07', 'Liu', 3, 'good product quality2'),
    new Comment(4, 4, '2020-07-05', 'Xiao', 3.5, 'good product quality3'),
    new Comment(5, 5, '2020-07-03', 'Xiao', 5, 'good product quality45'),
    new Comment(6, 3, '2020-07-09', 'Liu', 2, 'good product quality7'),
    new Comment(7, 4, '2020-06-12', 'Xiao', 3.5, 'good product quality8'),
    new Comment(8, 5, '2020-07-22', 'Liu', 2.5, 'good product quality9'),
    new Comment(9, 6, '2020-04-02', 'Xiao', 4.5, 'good product quality10'),
    new Comment(10, 7, '2020-04-06', 'Liu', 4, 'good product quality3'),
    new Comment(11, 8, '2020-04-12', 'Liu', 3, 'good product quality1'),
    new Comment(12, 2, '2020-04-22', 'Xiao', 3.5, 'good product quality2'),
];
