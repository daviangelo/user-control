export class User {
    constructor(
        public id: number,
        public name: string,
        public password: string,
        public email: string,
        public cpf: string,
        public telephone: string,
        public role: string
    ){}
}