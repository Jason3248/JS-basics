import
{
    pgTable,
    integer,
    varchar,
    timestamp,
    serial,

} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const students = pgTable(
    "students", 
    {
        id: serial("id").primaryKey(),
        firstName: varchar("first_name", {length: 100}).notNull(),
        lastName: varchar("last_name", {length: 100}).notNull(),
        email: varchar("email").unique().notNull(),
        age: integer("age").notNull(),
        createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
        updatedAt: timestamp("updated_at", {withTimezone: true}).defaultNow().notNull()

    }
)

export const studentProfiles = pgTable(
    "student_profiles",
    {
        id: serial("id").primaryKey(),
        contactNo: varchar("contact_no", {length: 10}).unique().notNull(),
        address: varchar("address", {length: 100}).notNull(),
        studentId: integer("student_id").unique().notNull().references(() => students.id, {onDelete: 'cascade'}),
        createdAt: timestamp("created_at", {withTimezone: true}).defaultNow().notNull(),
        updatedAt: timestamp("updated_at", {withTimezone: true}).defaultNow().notNull()
    }
);



export const studentsRelations = relations(students, ({one}) => {
    profile: one(studentProfiles, {
        fields: [studentProfiles.studentId],
        references: [students.id]
    })
});

export const studentProfilesRelations = relations(studentProfiles, ({one}) => {
    student: one(students, {
        fields: [studentProfiles.studentId],
        references: [students.id]
    })
});