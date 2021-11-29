CREATE SCHEMA event_store;

CREATE TABLE event_store.raw_events (
	id bigserial NOT NULL,
	"type" varchar(25) NOT NULL,
	hash varchar(128) NOT NULL,
	body jsonb NULL,
	CONSTRAINT raw_events_pkey PRIMARY KEY (id),
	CONSTRAINT raw_events_un UNIQUE (type, hash)
);

CREATE INDEX raw_events_type_idx ON event_store.raw_events USING btree (type);
