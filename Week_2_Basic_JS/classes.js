// classes

// class Rectangle{
//     constructor(width, height, color){
//         this.width = width;
//         this.height = height;
//         this.color = color;
//     }
//     area(){
//         const area = this.width*this.height;
//         return area;
//     }
//     paint(){
//         console.log(`Painting with color ${this.color}`);
//     }
// }

// const rect = new Rectangle(2,4,'RED');
// const area = rect.area();
// console.log(`Area of rectangle is ${area}`); 
// rect.paint();

// INHERITANCE

// class Shape{
//     constructor(color){
//         this.color = color;
//     }
//     paint(){
//         console.log(`The color of shape is ${this.color}`);
//     }
// }
// class Rectangle extends Shape{
//     constructor(length, width, color){
//         super(color);
//         this.length = length;
//         this.width = width;
//     }
//     area(){
//         return this.length*this.width;
//     }
//     getDescription(){
//         return `A rectangle with length ${this.length} & width ${this.width} has ${this.color} color`;
//     }
// }

// class Circle extends Shape{
//     constructor(radius, color){
//         super(color);
//         this.radius = radius;
//     }
//     area(){
//         return this.radius*this.radius*Math.PI;
//     }
//     getDescription(){
//         return `A rectangle with radius ${this.radius} has ${this.color} color`;
//     }
// }
// const color = new Shape("RED");
// const circle = new Circle(7,"BLUE");
// const rect = new Rectangle(10,5,"YELLOW");

// console.log(circle.area());
// console.log(rect.area());
// console.log(circle.getDescription());
// console.log(rect.getDescription());

// Date class
// const now = new Date();
// console.log(now.toISOString());

// MAP Class
// const map = new Map();
// map.set('name', 'Alice');
// map.set('age', 30);
// console.log(map.get('age'));


