import React from 'react';
import {
    FaPills,
    FaIndustry,
    FaCalendarAlt,
    FaWeight,
    FaFlask,
    FaBoxes,
    FaThermometerHalf,
    FaShieldAlt
} from 'react-icons/fa';

const SpecificationSection = ({ medicine }) => {
    const specifications = [
        {
            icon: <FaPills className="text-blue-500" />,
            label: 'Generic Name',
            value: medicine.genericName
        },
        {
            icon: <FaIndustry className="text-green-500" />,
            label: 'Manufacturer',
            value: medicine.company
        },
        {
            icon: <FaWeight className="text-purple-500" />,
            label: 'Strength',
            value: medicine.massUnit
        },
        {
            icon: <FaBoxes className="text-orange-500" />,
            label: 'Category',
            value: medicine.category
        },
        {
            icon: <FaCalendarAlt className="text-red-500" />,
            label: 'Stock Quantity',
            value: `${medicine.stockQuantity} units`
        },
        {
            icon: <FaFlask className="text-indigo-500" />,
            label: 'Discount',
            value: `${medicine.discount}%`
        }
    ];

    const storageInstructions = [
        'Store in a cool, dry place',
        'Keep away from direct sunlight',
        'Store at room temperature (15-25°C)',
        'Keep out of reach of children',
        'Do not freeze',
        'Keep container tightly closed'
    ];

    const safetyInfo = [
        'Read all warnings and instructions before use',
        'Consult your healthcare provider before taking',
        'Do not exceed recommended dosage',
        'Discontinue use if adverse reactions occur',
        'Not recommended for pregnant or nursing women without medical advice',
        'May cause drowsiness - avoid driving if affected'
    ];

    return (
        <div className="space-y-6">
            {/* Product Specifications */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Product Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                            <div className="text-xl">
                                {spec.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {spec.label}
                                </p>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {spec.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Storage Instructions */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaThermometerHalf className="text-blue-500" />
                    Storage Instructions
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <ul className="space-y-2">
                        {storageInstructions.map((instruction, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-blue-800 dark:text-blue-200"
                            >
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="text-sm">{instruction}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Safety Information */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaShieldAlt className="text-red-500" />
                    Important Safety Information
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="text-red-500 text-xl">⚠️</div>
                        <div>
                            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                                Please Read Carefully
                            </h4>
                            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                                This medication requires careful handling and proper usage.
                                Please follow all instructions and consult with a healthcare professional.
                            </p>
                        </div>
                    </div>

                    <ul className="space-y-2">
                        {safetyInfo.map((info, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-red-800 dark:text-red-200"
                            >
                                <span className="text-red-500 mt-1">•</span>
                                <span className="text-sm">{info}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Quality Assurance
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                        <li>• FDA approved facility</li>
                        <li>• GMP certified manufacturing</li>
                        <li>• Third-party tested</li>
                        <li>• Quality guaranteed</li>
                    </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                        <span className="text-purple-500">📋</span>
                        Prescription Information
                    </h4>
                    <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                        <li>• Prescription may be required</li>
                        <li>• Consult your doctor</li>
                        <li>• Follow prescribed dosage</li>
                        <li>• Regular monitoring recommended</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SpecificationSection;
