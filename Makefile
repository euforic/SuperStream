
TESTS = test/*.js
REPORTER = spec

all: superstream.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--timeout 2000 \
		--growl \
		$(TESTS)

test-cov: lib-cov
	SUPERSTREAM_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	jscoverage lib lib-cov

superstream.js: components
	component build --standalone superstream

components:
	component install

superstream.min.js: superstream.js
	uglifyjs --no-mangle $< > $@

test-server:
	@node test/server

docs: test-docs

test-docs:
	make test REPORTER=doc \
		| cat docs/head.html - docs/tail.html \
		> docs/test.html

clean:
	rm -fr superstream.js components

.PHONY: test-cov test docs test-docs clean