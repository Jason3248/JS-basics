CREATE TABLE "student_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_no" varchar(10) NOT NULL,
	"address" varchar(100) NOT NULL,
	"student_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "student_profiles_contact_no_unique" UNIQUE("contact_no"),
	CONSTRAINT "student_profiles_student_id_unique" UNIQUE("student_id")
);
--> statement-breakpoint
ALTER TABLE "student_profiles" 
ADD CONSTRAINT "student_profiles_student_id_students_id_fk" 
FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") 
ON DELETE cascade ON UPDATE no action;