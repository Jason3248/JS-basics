
import{
    pgTable,
    integer,
    varchar,
    timestamp,
    serial
}
from 'drizzle-orm/pg-core';

export const students = pgTable(
    "students",
    {
        id: serial("id").primaryKey(),
        firstName: varchar("first_name").notNull(),
        lastName: varchar("last_name").notNull(),
        email: varchar("email").unique().notNull(),
        age: integer("age").notNull(),
        createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
        updatedAt: timestamp("updated_at", {withTimezone: true}).notNull().defaultNow()
    }
);