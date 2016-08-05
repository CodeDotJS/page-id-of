import childProcess from 'child_process';
import test from 'ava';

test.cb('main', t => {
	const cp = childProcess.spawn('./cli.js', {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 1);
		t.end();
	});
});

test.cb('pageID', t => {
	childProcess.execFile('./cli.js', ['Humorous.Sperm.Official'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === `\u001b[?25l\n› Fetching Page's ID. Please wait!\n\u001b[?25l\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\n› Humorous.Sperm.Official is a facebook page!\n\n\u001b[?25l\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\n› Page ID of Humorous.Sperm.Official is 754773624621956\n\n\u001b[?25h`);
		t.end();
	});
});

test.cb('notAfacebookpage', t => {
	childProcess.execFile('./cli.js', ['notAfacebookPage'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === `\u001b[?25l\n› Fetching Page's ID. Please wait!\n\u001b[?25l\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\n› Sorry \"notAfacebookPage\" is not a facebook page!\n\n\u001b[?25h`);
		t.end();
	});
});
