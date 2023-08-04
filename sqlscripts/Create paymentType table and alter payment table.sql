CREATE TABLE paymentType 
(
	payment_type_id INT IDENTITY(1,1) PRIMARY KEY,
	payment_type VARCHAR(20)
)

INSERT INTO paymentType (payment_type) VALUES ('Cash'), ('Bank Transfer')

ALTER TABLE payment
	ADD payment_type_id INT,
	CONSTRAINT FK_payment_paymentType FOREIGN KEY (payment_type_id) REFERENCES paymentType(payment_type_id)


