'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;
const { BlogPosts } = require("../models");
const { Author } = require("../models");
const { runServer, closeServer } = require("../server");
const { router } = require("../authorRouter");
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
