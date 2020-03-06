 export type DataType = {
    id: number,
    fileName: string,
    date: string,
    description?: string,
    userName: string
 }
 
 const LIST_DATA:DataType[]  = [
    {
        id: 1,
        fileName: 'Product-brochure-2009.pdf',
        date: '12/02/2010',
        description: 'All the material on these pages is copyrighted and provided for personal and non commercial use only.',
        userName: 'John'
    },
    {
        id: 2,
        fileName: 'Product-brochure-2009-addendum.pdf',
        date: '16/02/2010',
        userName: 'Paul'
    },
    {
        id: 3,
        fileName: 'ProductPackshot.jpg',
        date: '17/02/2010',
        userName: 'George'
    }
];

export default LIST_DATA;