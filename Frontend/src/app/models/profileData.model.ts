export class ProfileData {
    constructor(
      public id: string = '',
      public role: string = '',
      public username: string = '',
      public name: string = '',
      public email: string = '',
      public gender: string = '',
      public phoneNumber: string = '',
      public dateOfBirth: Date = new Date(),
      public biography: string = '',
      // TODO: Change UserData class.
      //  public skills: Skills[] = [],
      //  public interests: Interests[] = [],
      //  public jobs: Jobs[] = [],
      //  public educations: Educations[] = [],
      public skills: string = '',
      public interests: string = '',
      public education: string = '',
      public work: string = '',
      public isPrivateProfile: boolean = false,
    ) {}

}