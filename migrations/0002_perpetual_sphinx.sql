CREATE TABLE `data` (
	`id` text PRIMARY KEY NOT NULL,
	`transaction_id` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE user ADD `username` text NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `avatar` text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
ALTER TABLE `api_key` DROP COLUMN `api_key`;