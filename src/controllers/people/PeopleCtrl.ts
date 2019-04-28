import {BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required} from "@tsed/common";
import {NotFound} from "ts-httpexceptions";
import {PeopleService} from "../../services/people/PeopleService";
import {Person} from "../../interfaces/Person";

@Controller("/people")
export class PeopleCtrl {

    constructor(private peopleService: PeopleService) {
    }

    @Post("/")
    save(@BodyParams() person: Person) {
        console.log(person);
        this.peopleService.create(person);
    }

    @Get("/")
    async getAllPeople(): Promise<Person[]> {
        const usuarios = this.peopleService.query();


        return usuarios;
    }

    @Get("/:id")
    async findById(@Required() @PathParams("id") id: string): Promise<Person> {
        console.log(id);
        const people = await this.peopleService.findById(id);
        if (people) {
            return people;
        }
        throw new NotFound("Person not found");
    }

    /**
     *
     * @param id
     * @param name
     * @returns {Promise<Calendar>}
     */
    @Put("/:id")
    async update(@PathParams("id") @Required() id: string,
                 @BodyParams() @Required() person: Person): Promise<Person> {
        return this.peopleService.update(id, person);
    }

    /**
     *
     * @param id
     * @returns {{id: string, name: string}}
     */
    @Delete("/:id")
    async remove(@BodyParams("id") @Required() id: string): Promise<void> {
        this.peopleService.remove(id);
    }
}
