declare @ID INT;

exec portal.InsertFamily 
@FullName = 'Test Name',
@Address = '22 Compton Close',
@City = 'London',
@PostCode = 'E33RS',
@Mobile = '01234567893',
@Email = 'example@gmail.com',
@ecFullname = 'emergency name',
@ecRelation = 'brother',
@ecAddress = '25 Compton',
@ecMobile = '09999999999',
@Notes = 'this is the first test for the insert family proc',
@FamilyID = @ID OUTPUT

exec portal.UpdateFamily
@FamilyID = 1,
@FullName = 'Test Name',
@Address = '22 Compton Close',
@City = 'London',
@PostCode = 'E33RS',
@Mobile = '1111111',
@Email = 'jawwad@gmail.com',
@ecFullname = 'Aqhsar',
@ecRelation = 'brother',
@ecAddress = '25 Compton',
@ecMobile = '22222',
@Notes = 'updated family 1'

exec portal.SelectFamilyByID 
@FamilyID = 1

select * from family
