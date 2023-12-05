DROP INDEX IF EXISTS `user_username_unique`;--> statement-breakpoint
ALTER TABLE api_key ADD `key` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `username`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `avatar`;