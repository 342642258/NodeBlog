var path = require('path');
var assert = require('assert');
var request = require('supertest');
var app = require('../app');
var userModel = require('../model/user');

var testName1 = '44444444';
var testName2 = 'nswbmw';

describe('users', function() {
    describe('POST /users', function() {
        var agent = request.agent(app);
        beforeEach(function (done) {
            // 创建一个用户
            userModel.create({
                username: testName1,
                password: '123456',
                avatar: '',
                email:'123456@qq.com'

            })
                .then(function () {
                    done();
                })
                .catch(done);
        });

        afterEach(function (done) {
            // 删除测试用户
            userModel.remove({ name: { $in: [testName1, testName2] } })
                .exec()
                .then(function () {
                    done();
                })
                .catch(done);
        });


        // 名户名错误的情况
        it('wrong name', function(done) {
            agent
                .post('/users')
                .type('form')
                .field({ name: '' })
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/用户名请限制在 1-10 个字符/));
                    done();
                });
        });

        // 用户名被占用的情况
        it('duplicate name', function(done) {
            agent
                .post('/users')
                .type('form')
                .field({ name: testName1, password: '123456'})
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/用户名已被占用/));
                    done();
                });
        });

        // 注册成功的情况
        it('success', function(done) {
            agent
                .post('/users')
                .type('form')
                .field({ name: testName2, password: '123456'})
                .redirects()
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(res.text.match(/注册成功/));
                    done();
                });
        });
    });
});