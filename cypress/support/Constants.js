import { faker } from '@faker-js/faker';

const randomString = Math.random().toString(36).substring(2, 8);

export const TESTDATA = {

  randomString,
  randomFirstName: `Tejaswini_${randomString}`,
  randomLastName: `H_${randomString}`,
  randomEmail: `tejaswini_${randomString}@yopmail.com`,
  address : faker.location.streetAddress(),
  city : faker.location.city(),
  state : faker.location.state(),
  zipcode : faker.location.zipCode('######'),
  mobile_number : faker.phone.number('9#########'),

}
