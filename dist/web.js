/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
const express_1 = __importDefault(__webpack_require__(2));
const morgan_1 = __importDefault(__webpack_require__(3));
const bodyParser = __importStar(__webpack_require__(4));
const cors_1 = __importDefault(__webpack_require__(5));
const routes_1 = __importDefault(__webpack_require__(6));
const express_sms_auth_1 = __webpack_require__(15);
const express_session_1 = __importDefault(__webpack_require__(16));
const connectRedis = __webpack_require__(17);
const redis_1 = __webpack_require__(18);
const db_1 = __webpack_require__(30);
const User_model_1 = __importDefault(__webpack_require__(11));
const config_1 = __webpack_require__(20);
const auth_1 = __webpack_require__(32);
const app = express_1.default();
app.use(morgan_1.default('tiny'));
app.use(cors_1.default({
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
    origin: [
        'http://lcpt.local:8080',
        'http://127.0.0.1:8080',
        'http://localhost:3000',
        'http://localhost:3001',
    ],
    credentials: true,
}));
// app.set('trust proxy', 1);
app.use(function (req, res, next) {
    if (req.headers['x-arr-ssl'] && !req.headers['x-forwarded-proto']) {
        req.headers['x-forwarded-proto'] = 'https';
    }
    return next();
});
const RedisStore = connectRedis(express_session_1.default);
app.use(express_session_1.default({
    store: new RedisStore({ client: redis_1.redisClient }),
    secret: 'lcpt-secret',
    resave: true,
    proxy: true,
    cookie: {
    // secure: config.app.env === Env.Production,
    // maxAge: 5184000000, // 2 months
    },
}));
app.use(bodyParser.json());
app.use(auth_1.passport.initialize());
app.use(auth_1.passport.session());
app.use(auth_1.clearSessionOnError); // for passport deserialization failures
app.get('/', (req, res) => {
    res.send({});
});
app.get('/logout', (req, res) => {
    req.logout();
    res.send({});
});
app.use(express_1.default.static('public'));
app.use('/', express_sms_auth_1.expressSmsAuth(function (verification, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phone } = req.body;
        const user = yield User_model_1.default.findOneOrFail({ phoneNumber: phone });
        console.log(user);
        req.login(user, (err) => {
            if (err) {
                console.error(`Failed to log user in:`, err);
                res.status(500).send({ error: true });
            }
            else {
                res.send({ user });
            }
        });
    });
}, {
    twilioSid: config_1.config.twilio.SID,
    twilioToken: config_1.config.twilio.TOKEN,
    twilioServiceId: config_1.config.twilio.SERVICE_ID
}, ['+447480833086']));
app.use('/', routes_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 12180;
    yield db_1.createConnection();
    app.listen(port);
    console.log('listening on port', port);
}))().catch(e => console.error(e.stack));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(2);
const user_1 = __importDefault(__webpack_require__(7));
const campus_1 = __importDefault(__webpack_require__(14));
const router = express_1.Router();
router.use('/user', user_1.default);
router.use('/campus', campus_1.default);
exports.default = router;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(2);
const express_async_handler_1 = __importDefault(__webpack_require__(8));
const util_1 = __webpack_require__(9);
const User_model_1 = __importDefault(__webpack_require__(11));
const Campus_model_1 = __importDefault(__webpack_require__(13));
const router = express_1.Router();
// router.use(authenticate)
// router.use(adminVerify)
exports.default = router;
// TODO: permissions for create/edit
router.get('/alumni.json', express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alumni = yield User_model_1.default.find({ isFellow: true });
    res.send(alumni);
})));
router.get('/', express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = yield util_1.listHandler(User_model_1.default, req);
    return util_1.responseHandler(res, params);
})));
router.get('/:id', express_async_handler_1.default(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield User_model_1.default.findOne(req.params.id);
        res.send(record);
    });
}));
router.delete('/:id', express_async_handler_1.default(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield User_model_1.default.delete(req.params.id);
        res.send(record);
    });
}));
router.post('/', express_async_handler_1.default(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqUser = req.user;
        // const isDean = reqUser.campus?.dean.id === reqUser.id;
        if (!reqUser.isAdmin) {
            throw new Error(`Only admins can create new users`);
        }
        const record = new User_model_1.default();
        if (reqUser.isAdmin && req.body.campus) {
            const newCampusId = (req.body.campus || {}).id;
            delete req.body.campus;
            const campus = yield Campus_model_1.default.findOneOrFail(newCampusId);
            record.campus = campus;
        }
        // else if (isDean) {
        //     record.campus = reqUser.campus;
        // }
        Object.assign(record, req.body);
        yield record.save();
        res.send(record);
    });
}));
router.put('/:id', express_async_handler_1.default(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield User_model_1.default.findOne(req.params.id);
        const body = req.body;
        const newCampusId = (body.campus || {}).id;
        delete body.campus;
        delete body.id;
        delete body.createdAt;
        delete body.updatedAt;
        if (body.isFellow && record.isFellow !== body.isFellow) {
            body.receivedFellowshipAt = new Date();
        }
        Object.assign(record, body);
        if ((record.campus || {}).id !== newCampusId) {
            const newCampus = yield Campus_model_1.default.findOneOrFail(newCampusId);
            record.campus = newCampus;
        }
        res.send(yield record.save());
    });
}));


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-async-handler");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(10);
function listHandler(model, req, whereExtender, extraQueryOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        const [from, to] = req.query.range ? JSON.parse(req.query.range) : [0, 100];
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        let where = {};
        if (filter.id) {
            where.id = typeorm_1.In(filter.id);
        }
        if (filter.user) {
            where = [{
                    name: typeorm_1.Raw(alias => `LOWER(${alias}) Like '%${filter.user.toLowerCase()}%'`),
                }, {
                    email: typeorm_1.Raw(alias => `LOWER(${alias}) Like '%${filter.user.toLowerCase()}%'`),
                }];
        }
        const finalWhere = whereExtender ? yield whereExtender(filter, where) : where;
        const [resp, total] = yield model.findAndCount(Object.assign({ where: finalWhere, skip: from, take: to - from + 1, order: {
                createdAt: 'ASC',
            } }, extraQueryOpts));
        return { resp, total, to, from };
    });
}
exports.listHandler = listHandler;
function responseHandler(res, { resp, total, to, from, }) {
    return res
        .set('Content-Range', `Content-Range: posts ${from}-${Math.min(to, total)}/${total}`)
        .set({ 'Access-Control-Expose-Headers': 'Content-Range' })
        .send(resp);
}
exports.responseHandler = responseHandler;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(10);
const Application_model_1 = __importDefault(__webpack_require__(12));
const Campus_model_1 = __importDefault(__webpack_require__(13));
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "stripeSubId", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isMember", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isFellow", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "receivedFellowshipAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Campus_model_1.default, { nullable: true, eager: true }),
    __metadata("design:type", Campus_model_1.default)
], User.prototype, "campus", void 0);
__decorate([
    typeorm_1.OneToOne(type => Application_model_1.default, { nullable: true }),
    __metadata("design:type", Application_model_1.default)
], User.prototype, "application", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.default = User;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(10);
const User_model_1 = __importDefault(__webpack_require__(11));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus[ApplicationStatus["PENDING"] = 0] = "PENDING";
    ApplicationStatus[ApplicationStatus["APPROVED"] = 1] = "APPROVED";
    ApplicationStatus[ApplicationStatus["DECLINED"] = 2] = "DECLINED";
})(ApplicationStatus = exports.ApplicationStatus || (exports.ApplicationStatus = {}));
let Application = class Application extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Application.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Application.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToOne(type => User_model_1.default, u => u.application),
    __metadata("design:type", User_model_1.default)
], Application.prototype, "user", void 0);
Application = __decorate([
    typeorm_1.Entity()
], Application);
exports.default = Application;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = __webpack_require__(10);
const User_model_1 = __importDefault(__webpack_require__(11));
let Campus = class Campus extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Campus.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Campus.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Campus.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Campus.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Campus.prototype, "address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Campus.prototype, "webUrl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Campus.prototype, "calendarUrl", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_model_1.default),
    __metadata("design:type", User_model_1.default)
], Campus.prototype, "dean", void 0);
__decorate([
    typeorm_1.OneToMany(type => User_model_1.default, u => u.campus),
    __metadata("design:type", Array)
], Campus.prototype, "users", void 0);
Campus = __decorate([
    typeorm_1.Entity()
], Campus);
exports.default = Campus;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(2);
const express_async_handler_1 = __importDefault(__webpack_require__(8));
const util_1 = __webpack_require__(9);
const Campus_model_1 = __importDefault(__webpack_require__(13));
const router = express_1.Router();
// router.use(authenticate)
// router.use(adminVerify)
exports.default = router;
router.get('/', express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = yield util_1.listHandler(Campus_model_1.default, req, null, { relations: ['dean'] });
    return util_1.responseHandler(res, params);
})));
router.get('/:id', express_async_handler_1.default(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield Campus_model_1.default.findOne(req.params.id);
        res.send(record);
    });
}));


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-sms-auth");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis = __importStar(__webpack_require__(19));
const config_1 = __webpack_require__(20);
exports.redisClient = redis.createClient(config_1.config.redis.url);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(21);
__export(__webpack_require__(21));
config_1.convictConfig.validate({ allowed: 'strict' });
exports.config = config_1.convictConfig.get();


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(22);
const convict_1 = __importDefault(__webpack_require__(28));
const redis_1 = __webpack_require__(29);
var Env;
(function (Env) {
    Env["Test"] = "test";
    Env["Development"] = "development";
    Env["Production"] = "production";
    Env["Staging"] = "staging";
})(Env = exports.Env || (exports.Env = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "debug";
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
const convictConfig = convict_1.default({
    app: {
        env: {
            doc: 'The current environment of the app',
            format: String,
            default: Env.Development,
            env: 'NODE_ENV',
        },
        name: {
            doc: 'The name of the current server instance for handling loggers',
            format: String,
            default: 'lcpt API',
            env: 'API_NAME',
        },
        host: {
            doc: 'The host on which the server should run.',
            format: String,
            default: 'localhost',
            env: 'HOST',
        },
        port: {
            doc: 'The port on which the server should run.',
            format: 'port',
            default: 12180,
            env: 'PORT',
        },
        logLevel: {
            doc: 'Logging level, can be log, console, warn, error, info',
            format: String,
            default: LogLevel.Error,
            env: 'LOG_LEVEL',
        },
    },
    redis: {
        url: {
            doc: 'Redis url',
            format: String,
            default: redis_1.redisDefault,
            env: 'REDIS_URI',
        },
    },
    twilio: {
        SID: {
            format: String,
            default: null,
            env: 'TWILIO_SID',
        },
        SERVICE_ID: {
            format: String,
            default: null,
            env: 'TWILIO_SERVICE_ID',
        },
        TOKEN: {
            format: String,
            default: null,
            env: 'TWILIO_TOKEN',
        },
    },
});
exports.convictConfig = convictConfig;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* @flow */

(function () {
  __webpack_require__(23).config(
    Object.assign(
      {},
      __webpack_require__(26),
      __webpack_require__(27)(process.argv)
    )
  )
})()


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = __webpack_require__(24)
const path = __webpack_require__(25)

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\n|\r|\r\n/

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = options.path
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/* @flow */

// ../config.js accepts options via environment variables
const options = {}

if (process.env.DOTENV_CONFIG_ENCODING != null) {
  options.encoding = process.env.DOTENV_CONFIG_ENCODING
}

if (process.env.DOTENV_CONFIG_PATH != null) {
  options.path = process.env.DOTENV_CONFIG_PATH
}

if (process.env.DOTENV_CONFIG_DEBUG != null) {
  options.debug = process.env.DOTENV_CONFIG_DEBUG
}

module.exports = options


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/* @flow */

const re = /^dotenv_config_(encoding|path|debug)=(.+)$/

module.exports = function optionMatcher (args /*: Array<string> */) {
  return args.reduce(function (acc, cur) {
    const matches = cur.match(re)
    if (matches) {
      acc[matches[1]] = matches[2]
    }
    return acc
  }, {})
}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("convict");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.redisDefault = process.env.REDIS_URI ||
    process.env.REDISCLOUD_URL || // heroku
    (process.env.REDIS_PORT_6379_TCP_ADDR // docker
        ? `redis://${process.env.REDIS_PORT_6379_TCP_ADDR}:${process.env.REDIS_PORT_6379_TCP_PORT}`
        : 'redis://localhost:6379'); // native


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const db_1 = __webpack_require__(31);
const User_model_1 = __importDefault(__webpack_require__(11));
const Campus_model_1 = __importDefault(__webpack_require__(13));
const Application_model_1 = __importDefault(__webpack_require__(12));
const url = process.env.DATABASE_URL || db_1.postgresDefault;
const connectOptions = () => ({
    type: 'postgres',
    url,
    synchronize: false,
    logging: false,
    entities: [
        User_model_1.default,
        Campus_model_1.default,
        Application_model_1.default
    ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
    extra: {
        ssl: db_1.postgresConfig.get('useSsl'),
    },
});
function createConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            connection = yield typeorm_1.getConnection();
            return connection;
        }
        catch (e) {
            // We ignore since its likely that it caused because there was no connection
        }
        try {
            connection = yield typeorm_1.createConnection(connectOptions());
            return connection;
        }
        catch (e) {
            console.error(e);
            // Logger.error(e)
            throw e;
        }
    });
}
exports.createConnection = createConnection;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convict_1 = __importDefault(__webpack_require__(28));
const postgresConfig = convict_1.default({
    dbHost: {
        doc: 'Database host name/IP',
        format: '*',
        default: 'localhost',
        env: 'DATABASE_HOST',
    },
    dbUser: {
        doc: 'Database authenticaton username',
        format: String,
        default: 'lcpt-test',
        env: 'DATABASE_USERNAME',
    },
    dbPassword: {
        doc: 'Database authenticaton password',
        format: String,
        default: 'lcpt-test',
        env: 'DATABASE_PASSWORD',
    },
    dbName: {
        doc: 'Postgre default database name',
        format: String,
        default: 'lcpt-test',
        env: 'DATABASE_NAME',
    },
    useSsl: {
        doc: 'Flag whether postgres should use ssl or not',
        format: Boolean,
        default: false,
        env: 'DATABASE_USE_SSL',
    },
});
exports.postgresConfig = postgresConfig;
// lets use codeship default postgre if inside ci
if (process.env.CI) {
    postgresConfig.set('dbUser', process.env.PGUSER);
    postgresConfig.set('dbPassword', process.env.PGPASSWORD);
    postgresConfig.set('dbName', 'test');
}
const { dbHost, dbUser, dbPassword, dbName } = postgresConfig.get();
exports.postgresDefault = `postgresql://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(__webpack_require__(33));
exports.passport = passport_1.default;
const User_model_1 = __importDefault(__webpack_require__(11));
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_model_1.default.findOneOrFail(id);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
});
function clearSessionOnError(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    if (err.name === 'EntityNotFound') {
        // When passport.deserialize fails, it throws this
        req.session.destroy(() => {
            // NOOP
        });
        req.logout();
        return res.redirect(req.path);
    }
    return res.sendStatus(err.status || 500);
}
exports.clearSessionOnError = clearSessionOnError;
function protect(req, res, next) {
    if (req.method === 'OPTIONS') {
        return res.send();
    }
    if (!req.user) {
        res.status(400).send({ message: 'Not Logged In' });
    }
    else {
        next();
    }
}
exports.protect = protect;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ })
/******/ ]);