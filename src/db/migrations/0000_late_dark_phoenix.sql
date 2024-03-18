CREATE TABLE IF NOT EXISTS "dim_city" (
	"city_id" integer PRIMARY KEY NOT NULL,
	"city_name" text NOT NULL,
	"state_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dim_client" (
	"client_id" integer PRIMARY KEY NOT NULL,
	"client_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dim_date" (
	"transaction_date" timestamp PRIMARY KEY NOT NULL,
	"year" smallint NOT NULL,
	"month_number" char(2) NOT NULL,
	"year_month_number" char(7) NOT NULL,
	"year_month_short" char(8) NOT NULL,
	"month_name_short" char(3) NOT NULL,
	"month_name_long" char(9) NOT NULL,
	"day_of_week_number" smallint NOT NULL,
	"day_of_week_short" char(3) NOT NULL,
	"quater" char(2) NOT NULL,
	"year_quater" char(7) NOT NULL,
	"week_number" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dim_fire_insurance_products" (
	"product_id" integer PRIMARY KEY NOT NULL,
	"product_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facts" (
	"billing_id" integer PRIMARY KEY NOT NULL,
	"statement_account_no" text NOT NULL,
	"statement_date" timestamp NOT NULL,
	"policy_number" text NOT NULL,
	"client_id" integer NOT NULL,
	"building_city_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"premium" real NOT NULL,
	"other_charges" real NOT NULL,
	"total_charges" real NOT NULL,
	"coverage_date_from" timestamp DEFAULT now() NOT NULL,
	"coverage_date_to" timestamp DEFAULT now() NOT NULL,
	"total_amount_paid" real NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facts" ADD CONSTRAINT "facts_statement_date_dim_date_transaction_date_fk" FOREIGN KEY ("statement_date") REFERENCES "dim_date"("transaction_date") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facts" ADD CONSTRAINT "facts_client_id_dim_client_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "dim_client"("client_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facts" ADD CONSTRAINT "facts_building_city_id_dim_city_city_id_fk" FOREIGN KEY ("building_city_id") REFERENCES "dim_city"("city_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facts" ADD CONSTRAINT "facts_product_id_dim_fire_insurance_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "dim_fire_insurance_products"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
