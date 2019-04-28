import {Service} from "@tsed/common";
import {Person} from "../../interfaces/Person";

const datastore = require("nedb");
const db = new datastore({filename: "documents.json"});
db.loadDatabase((err) => console.log(err || "DB loaded with success."));


@Service()
export class PeopleService {

    constructor() {
    }

    /**
     * Find a person by his ID.
     * @param id
     * @returns {undefined|Person}
     */
    async findById(id: string): Promise<Person> {
        return db.find({_id: id}, (err, docs) => {
            return docs;
        });
    }

    /**
     * Create a new Person
     * @param person
     * @returns {{id: any, name: string}}
     */
    async create(person: Person) {
        return db.insert(person, (err) => {
            if (err) return console.log(err);

            console.log("Novo usuário adicionado!");
        });
    }

    /**
     *
     * @returns {Person[]}
     */
    async query(): Promise<Person[]> {
        return db.find({}, (err, usuarios) => {
            // if (err) return console.log(err);
            //
            // return  usuarios;
        });
    }

    /**
     *
     * @param id
     * @param person
     * @returns {Person}
     */
    async update(id: string, person: Person): Promise<Person> {
        return db.update({_id: id}, person, (err) => {
            if (err) return console.log(err);

            console.log("Usuário atualizado");
        });
        ;
    }

    /**
     *
     * @param id
     * @returns {Promise<Person>}
     */
    async remove(id: string): Promise<Person> {
        return null;
    }
}