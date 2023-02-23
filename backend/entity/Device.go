package entity

import (
	"time"
	"unicode"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Type struct {
	gorm.Model
	Type_Name string
	Device    []Device `gorm:"ForeignKey:TypeID"`
}

type Windows struct {
	gorm.Model
	Windows_Name string
	Device       []Device `gorm:"ForeignKey:WindowsID"`
}

type Device struct {
	gorm.Model
	CPU      string `valid:"required~กรุณากรอกข้อมูล CPU,isNotSpecialCharacter~กรอกข้อมูล CPU ไม่ถูกต้อง"`
	Monitor  string `valid:"required~กรุณากรอกข้อมูล Monitor,isNotSpecialCharacter~กรอกข้อมูล Monitor ไม่ถูกต้อง"`
	GPU      string `valid:"required~กรุณากรอกข้อมูล GPU,isNotSpecialCharacter~กรอกข้อมูล GPU ไม่ถูกต้อง"`
	RAM      string `valid:"required~กรุณากรอกข้อมูล RAM,isNotSpecialCharacter~กรอกข้อมูล RAM ไม่ถูกต้อง"`
	Harddisk string `valid:"required~กรุณากรอกข้อมูล Harddisk,isNotSpecialCharacter~กรอกข้อมูล Harddisk ไม่ถูกต้อง"`
	Problem  string

	CustomerID *uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	TypeID *uint
	Type   Type `gorm:"references:id" valid:"-"`

	WindowsID *uint
	Windows   Windows `gorm:"references:id" valid:"-"`

	Save_Time time.Time `valid:"required~กรุณาใส่วันที่ และ เวลา,CheckDatetimeAddressAndDevice~วันที่ และ เวลา ไม่ถูกต้อง"`

	ORDER []ORDER `gorm:"ForeignKey:DeviceID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("isNotSpecialCharacter", func(i interface{}, _ interface{}) bool {
		field, ok := i.(string)
		if !ok {
			return false
		}

		for _, char := range field {
			if !unicode.IsLetter(char) && !unicode.IsNumber(char) && !unicode.IsSpace(char) {
				return false
			}
		}
		return true
	})
}
