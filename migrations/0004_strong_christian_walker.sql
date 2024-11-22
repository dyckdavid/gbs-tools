CREATE TABLE `forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`google_form_embed_link` text,
	`link_name` text,
	`created_at` integer NOT NULL,
	`is_public` integer DEFAULT 0
);
