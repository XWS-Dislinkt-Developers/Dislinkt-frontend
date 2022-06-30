export class UserData {
    constructor(
      public id: string = '',
      public username: string = '',
      public name: string = '',
      public email: string = '',
      public gender: string = '',
      public phoneNumber: string = '',
      public dateOfBirth: Date = new Date(),
      public biography: string = '',
      // TODO: Change UserData class.
      //public skills: Skills[] = [],
      //public interests: Interests[] = [],
      //public jobs: Jobs[] = [],
      //public educations: Educations[] = [],
      public skills: string = '',
      public interests: string = '',
      public educations: string = '',
      public jobs: string = '',
      public isPrivate: boolean = false,
    ) {}

}