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

declare @ID INT;
exec portal.InsertStudent
@FamilyID = 2,
@FullName = 'STUDENT 2',
@DOB = '12/27/2007',
@SchoolYear = 10,
@School = 'LEA',
@MedicalInfo = 'N/A',
@Notes = '',
@StudentID = @ID OUTPUT

exec portal.UpdateStudent
@StudentID = 2,
@FamilyID = 1,
@FullName = 'STUDENT 2 updated',
@DOB = '1/27/2007',
@SchoolYear = 10,
@School = 'LEA',
@MedicalInfo = 'N/A',
@Notes = 'this is an update'

exec portal.SelectAllStudents

exec portal.SelectStudentByID @StudentID = 1