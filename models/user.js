const Sequelize = require('sequelize'); // Sequelize 모듈

class User extends Sequelize.Model { // User 모델 정의
    static initiate(sequelize) { // 모델을 초기화하는 정적 메서드, 매개변수: sequelize 인스턴스
        User.init({
            email: { // 이메일 필드
                type: Sequelize.STRING(40), // 최대 40자의 문자열 타입
                allowNull: true, // null 값 허용
                unique: true, // 이메일: 고유값
            },
            nick: { // 닉네임 필드
                type: Sequelize.STRING(15), // 최대 15자의 문자열 타입
                allowNull:false, // null 값 허용 X
            },
            password: { // 비밀번호 필드
                type: Sequelize.STRING(100), // 최대 100자의 문자열 타입
                allowNull: true, // null 값 허용
            },
            provider: { // provider 필드
                type: Sequelize.STRING(10), // 최대 10자의 문자열 타입
                allowNull: false, // null 값 허용 X
                defaultValue: 'local', // 기본값 'local'
                validate: { // 
                    isIn: [['local', 'kakao']]
                }
            },
            snsId: { // snsId 필드
                type: Sequelize.STRING(100),
                allowNull: true, //
            },
        }, {
            sequelize, // Sequelize 인스턴스 연결
            timestamps: true, // crestedAt, updatedAt 타임스탬프 자동 추가
            underscored: false, // 필드 이름을 카멜 케이스로 유지
            modelName: 'User', // 모델 이름: 'User'
            tableName: 'users', // 테이블 이름 'users'
            paranoid: true, // deletedAt 타임스탬프 추가 -> 소프트 삭제 활성화
            charset: 'utf8', // 테이블의 문자 집합: UTF-8
            collate: 'utf8_general_ci', // 테이블 정렬 기준: UTF-8 일반 대소문자 구분 없이 설정
        });
    }

    static associate(db) { //
        db.User.hasMany(db.Post); //
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId', //
            as: 'Followers', //
            through: 'Follow', //
        });
        db.User.belongsToMany(db.User, { //
            foreignKey: 'followerId', //
            as: 'Followings', //
            through: 'Follow', //
        });
        db.User.hasMany(db.Domain)
    }
};

module.exports = User; // User 객체를 모델로 내보냄