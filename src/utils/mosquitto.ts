import { Store } from 'vuex';
import { StoreState } from '../store'
import { AppendDataPayload } from '../types/chart-data'
import config from '../config'

export default class MosquittoService {

    private store: Store<StoreState>;

    private pairNameObjectProperty: { [id: string]: string } = {};

    constructor(store: Store<StoreState>) {
        this.store = store;
        for (const k in this.cosoDaSistemare) {
            this.pairNameObjectProperty[this.cosoDaSistemare[k]] = k;
        }
        this.store.commit('initChartData', Object.keys(this.cosoDaSistemare))
    }


    public startSimulator(ms = config.updateRate) {
        setInterval(() => {
            this.updateStoreStatus({
                inverters: { right: { speed: 1 } },
            });
        }, ms)
    }
    private loopObjectProperties(obj: any, callback: (value: any, propName: string) => void, propName: string[] = []): void {
        for (const k in obj) {
            if (typeof obj[k] === 'object')
                this.loopObjectProperties(obj[k], callback, [...propName, k]);
            else
                callback(obj[k], [...propName, k].join('.'));
        }
    }

    private i = 0;

    private updateStoreStatus(mqttObj: any) {
        this.i++;
        const payload: AppendDataPayload = {} 
        // this.loopObjectProperties(mqttObj, (value, propName) => {
        //     const fieldName = this.pairNameObjectProperty[propName];
        //     if (fieldName) {
        //         payload[fieldName] = { dates: [new Date().getTime()], values: [Math.random()] }
        //     }
        // })

        for (const k in this.pairNameObjectProperty) {
            const fieldName = this.pairNameObjectProperty[k];
            if (fieldName) {
                payload[fieldName] = { dates: [new Date().getTime()], values: [Math.random()] }
            }
        }
        this.store.commit('appendData', payload)
    }


    private cosoDaSistemare: { [id: string]: string } = {
        "INVERTER_RIGHT_SPEED": "inverters.right.speed",
        "INVERTER_RIGHT_TEMPERATURE_IGBT": "inverters.right.temperature_igbt",
        "INVERTER_RIGHT_TEMPERATURE_MOTORS": "inverters.right.temperature_motors",
        "INVERTER_RIGHT_TORQUE": "inverters.right.torque",

        "INVERTER_LEFT_SPEED": "inverters.left.speed",
        "INVERTER_LEFT_TEMPERATURE_IGBT": "inverters.left.temperature_igbt",
        "INVERTER_LEFT_TEMPERATURE_MOTORS": "inverters.left.temperature_motors",
        "INVERTER_LEFT_TORQUE": "inverters.left.torque",

        "BMS_HV_TEMPERATURE_MAX": "bms_hv.temperature#max",
        "BMS_HV_TEMPERATURE_MIN": "bms_hv.temperature#min",
        "BMS_HV_TEMPERATURE_AVG": "bms_hv.temperature#average",

        "BMS_HV_VOLTAGE_MAX": "bms_hv.voltage#max",
        "BMS_HV_VOLTAGE_MIN": "bms_hv.voltage#min",
        "BMS_HV_VOLTAGE_TOT": "bms_hv.voltage#total",

        "BMS_HV_CURRENT_CURR": "bms_hv.current#current",
        "BMS_HV_CURRENT_POW": "bms_hv.current#pow",

        "BMS_HV_ERRORS_FAULT_ID": "bms_hv.errors#fault_id",
        "BMS_HV_ERRORS_FAULT_INDEX": "bms_hv.errors#fault_index",

        "BMS_HV_WARNINGS_FAULT_ID": "bms_hv.warnings#fault_id",
        "BMS_HV_WARNINGS_FAULT_INDEX": "bms_hv.warnings#fault_index",

        "BMS_LV_VOLTAGE": "bms_lv.values#voltage",
        "BMS_LV_TEMPERATURE": "bms_lv.values#temperature",
        "BMS_LV_ERRORS": "bms_lv.errors",

        "GPS_GGA_LAT_SAFE": "gps.new.gga#latitude_safe",
        "GPS_GGA_LON_SAFE": "gps.new.gga#longitude_safe",
        "GPS_GGA_LAT": "gps.new.gga#latitude",
        "GPS_GGA_LON": "gps.new.gga#longitude",
        "GPS_GGA_ALTITUDE": "gps.new.gga#altitude",
        "GPS_GGA_NS_INDICATOR": "gps.new.gga#ns_indicator",
        "GPS_GGA_EW_INDICATOR": "gps.new.gga#ew_indicator",
        "GPS_GGA_UTC_TIME": "gps.new.gga#utc_time",

        "GPS_GLL_LAT": "gps.new.gll#latitude",
        "GPS_GLL_LON": "gps.new.gll#longitude",
        "GPS_GLL_NS_INDICATOR": "gps.new.gll#ns_indicator",
        "GPS_GLL_EW_INDICATOR": "gps.new.gll#ew_indicator",
        "GPS_GLL_UTC_TIME": "gps.new.gll#utc_time",

        "GPS_VTG_G_SPEED_KNOTS": "gps.new.vtg#ground_speed_knots",
        "GPS_VTG_G_SPEED_HUMAN": "gps.new.vtg#ground_speed_human",

        "GPS_RMC_LAT": "gps.new.rmc#latitude",
        "GPS_RMC_LON": "gps.new.rmc#longitude",
        "GPS_RMC_NS_INDICATOR": "gps.new.rmc#ns_indicator",
        "GPS_RMC_EW_INDICATOR": "gps.new.rmc#ew_indicator",
        "GPS_RMC_UTC_TIME": "gps.new.rmc#utc_time",
        "GPS_RMC_DATE": "gps.new.rmc#date",
        "GPS_RMC_G_SPEED_KNOTS": "gps.new.rmc#ground_speed_knots",

        "IMU_OLD_GYRO_X": "imu_old.gyro#x",
        "IMU_OLD_GYRO_Y": "imu_old.gyro#y",
        "IMU_OLD_GYRO_Z": "imu_old.gyro#z",

        "IMU_OLD_ACCEL_X": "imu_old.accel#x",
        "IMU_OLD_ACCEL_Y": "imu_old.accel#y",
        "IMU_OLD_ACCEL_Z": "imu_old.accel#z",

        "IMU_GYRO_X": "imu.gyro#x",
        "IMU_GYRO_Y": "imu.gyro#y",
        "IMU_GYRO_Z": "imu.gyro#z",

        "IMU_ACCEL_X": "imu.accel#x",
        "IMU_ACCEL_Y": "imu.accel#y",
        "IMU_ACCEL_Z": "imu.accel#z",

        "F_WHEELS_ENCODER_RIGHT_SPEED": "front_wheels_encoders.right.speed#speed",
        "F_WHEELS_ENCODER_RIGHT_SPEED_RADS": "front_wheels_encoders.right.speed_rads",
        "F_WHEELS_ENCODER_RIGHT_ANGLE_0": "front_wheels_encoders.right.angle#angle_0",
        "F_WHEELS_ENCODER_RIGHT_ANGLE_1": "front_wheels_encoders.right.angle#angle_1",
        "F_WHEELS_ENCODER_RIGHT_ANGLE_DELTA": "front_wheels_encoders.right.angle#angle_delta",

        "F_WHEELS_ENCODER_LEFT_SPEED": "front_wheels_encoders.left.speed#speed",
        "F_WHEELS_ENCODER_LEFT_SPEED_RADS": "front_wheels_encoders.left.speed_rads",
        "F_WHEELS_ENCODER_LEFT_ANGLE_0": "front_wheels_encoders.left.angle#angle_0",
        "F_WHEELS_ENCODER_LEFT_ANGLE_1": "front_wheels_encoders.left.angle#angle_1",
        "F_WHEELS_ENCODER_LEFT_ANGLE_DELTA": "front_wheels_encoders.left.angle#angle_delta",

        "DISTANCE_METERS": "distance#meters",
        "DISTANCE_ROTATIONS": "distance#rotations",
        "DISTANCE_ANGLE": "distance#angle",
        "DISTANCE_CLOCK_PERIOD": "distance#clock_period",

        "PEDALS_THROTTLE": "pedals.throttle",
        "PEDALS_BRAKE_IS_BRAKING": "pedals.brake#is_braking",
        "PEDALS_BRAKE_PRESSURE_FRONT": "pedals.brake#pressure_front",
        "PEDALS_BRAKE_PRESSURE_BACK": "pedals.brake#pressure_back",

        "S_WHEEL_ENCODER": "steering_wheel.encoder",
        "S_WHEEL_GEARS_CONTROL": "steering_wheel.gears#control",
        "S_WHEEL_GEARS_COOLING": "steering_wheel.gears#cooling",
        "S_WHEEL_GEARS_MAP": "steering_wheel.gears#map"
    }
}