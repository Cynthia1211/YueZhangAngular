export class Projects {

    id: string;
    title: string;
    img_1: string;
    description: string;
    img_2: string;
    overview: string;
    frontend: string;
    backend: string;
    database: string;
    others: string;
    longDescription: string;
    usedTech: string;
    projectUrl: string;
    
    constructor(
        id: string = 'XX',
        title: string = 'Project Title',
        img_1: string = 'Image URL',
        description: string = 'Project Desc',
        img_2: string = 'Image URL',
        overview: string = 'Project Overview',
        frontend: string = 'Frontend Tech',
        backend: string = 'Backend Tech',
        database: string = 'Database Tech',
        others: string = 'Other Tech',
        longDescription: string = 'Long Description',
        usedTech: string = 'Used Tech',
        projectUrl: string = 'Project URL',
    ) {
        this.id = id;
        this.title = title;
        this.img_1 = img_1;
        this.description = description;
        this.img_2 = img_2;
        this.overview = overview;
        this.frontend = frontend;
        this.backend = backend;
        this.database = database;
        this.others = others;
        this.longDescription = longDescription;
        this.usedTech = usedTech;
        this.projectUrl = projectUrl;
    }
}
