const Owner = require("../models/ownerModel");



const registerOwner = async (req, res) => {
    try {
<<<<<<< HEAD
        const { fullName, phone, address, govIdProof } = req.body;
        const currentUser = req.user
        console.log(currentUser)
        const owner = await Owner.findOne({ phone })
        if (owner) {
            return res.status(400).json({ message: "Owner already exists" })
        }
=======
        console.log('Register Owner Request Body:', req.body);
        console.log('Authenticated User:', req.user);
        
        // Validate required fields
        const { fullName, phone, govIdProof } = req.body;
        const address = req.body.address || '';
        
        if (!fullName || !phone || !govIdProof) {
            console.error('Missing required fields:', { fullName, phone, govIdProof });
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                required: ['fullName', 'phone', 'govIdProof']
            });
        }

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            console.error('No authenticated user found');
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Check if owner with phone already exists
        const existingOwner = await Owner.findOne({ phone });
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: 'Owner with this phone number already exists'
            });
        }

        // Create new owner
>>>>>>> feature/backup-changes
        const newOwner = await Owner.create({
            fullName,
            phone,
            address,
            govIdProof,
<<<<<<< HEAD
            userId: currentUser.id
        })
        // Populate the userId field to include user details
        const populatedOwner = await newOwner.populate('userId')
        res.status(201).json({ message: "Owner registered successfully", owner: populatedOwner })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    };
=======
            userId: req.user.id
        });
>>>>>>> feature/backup-changes

        // Populate the userId field to include user details
        const populatedOwner = await newOwner.populate('userId');
        
        console.log('Owner created successfully:', populatedOwner);
        
        res.status(201).json({
            success: true,
            message: 'Owner registered successfully',
            owner: populatedOwner
        });

    } catch (error) {
        console.error('Error in registerOwner:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await Owner.findById(id)
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" })
        }
        res.status(200).json({ message: "Owner found successfully", owner })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllOwner = async (req, res) => {
    try {
<<<<<<< HEAD
        const owners = await Owner.find().populate('userId', 'email username')
        if (!owners) {
            return res.status(404).json({ message: "Owner not found" })
        }

        const formattedOwners = owners.map(owner => ({
            id: owner._id,
            name: owner.name || owner.userId?.username || "N/A",
            email: owner.userId?.email || "N/A",
            status: owner.isVerified,
        }));

        res.status(200).json({ message: "Owner found successfully", owner: formattedOwners })
    } catch (error) {
        res.status(500).json({ message: error.message })
=======
        console.log('Received request with query params:', req.query);
        
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            searchFields = 'fullName,phone,email', 
            sort = '-createdAt' 
        } = req.query;
        
        const skip = (page - 1) * limit;

        // Build search query
        let query = {};
        if (search && searchFields) {
            const searchRegex = new RegExp(search, 'i');
            const fields = searchFields.split(',').map(f => f.trim()).filter(Boolean);
            
            if (fields.length > 0) {
                query.$or = fields.map(field => ({
                    [field]: { $regex: searchRegex }
                }));
                console.log('Search query:', JSON.stringify(query, null, 2));
            }
        }

        // Build sort object
        const sortObj = {};
        if (sort) {
            const sortFields = typeof sort === 'string' ? sort.split(',') : [];
            sortFields.forEach(field => {
                const sortOrder = field.startsWith('-') ? -1 : 1;
                const fieldName = field.replace(/^-/, '');
                if (fieldName) {
                    sortObj[fieldName] = sortOrder;
                }
            });
        }
        
        console.log('Final query:', JSON.stringify(query, null, 2));
        console.log('Sort object:', sortObj);
        console.log(`Fetching ${limit} owners from page ${page} (skip ${skip})`);

        // Get total count for pagination
        const total = await Owner.countDocuments(query);
        console.log(`Total owners found: ${total}`);
        
        // Get paginated and sorted results
        const owners = await Owner.find(query)
            .sort(sortObj)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('userId', 'username email')
            .lean();
            
        console.log(`Found ${owners.length} owners`);

        const response = {
            success: true,
            docs: owners,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        };
        
        console.log('Sending response:', JSON.stringify(response, null, 2).substring(0, 500) + '...');
        
        res.status(200).json(response);
    } catch (error) {
        console.error('Error in getAllOwner:', error);
        const errorResponse = {
            success: false,
            message: 'Error fetching owners',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        };
        console.error('Error response:', errorResponse);
        res.status(500).json(errorResponse);
>>>>>>> feature/backup-changes
    }
};

const updateOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await Owner.findById(id)
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" })
        }
        owner.fullName = req.body.fullName
        owner.phone = req.body.phone
        owner.address = req.body.address
        owner.govIdProof = req.body.govIdProof
        await owner.save()
        res.status(200).json({ message: "Owner updated successfully", owner })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteOwner = async (req, res) => {
    try {
<<<<<<< HEAD
        const { id } = req.params;
        const owner = await Owner.findByIdAndDelete(id)
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" })
        }
        res.status(200).json({ message: "Owner deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
=======
        const {id} = req.params;
        const owner = await Owner.findByIdAndDelete(id);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }
        res.status(200).json({ message: "Owner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
>>>>>>> feature/backup-changes
    }
};

<<<<<<< HEAD
=======
// Get owner statistics
const getOwnerStats = async (req, res) => {
    console.log('Fetching owner statistics...');
    
    try {
        // 1. Get total number of owners (with fallback)
        let totalOwners = 0;
        try {
            totalOwners = await Owner.estimatedDocumentCount().maxTimeMS(5000);
            console.log('Total owners:', totalOwners);
        } catch (countError) {
            console.warn('Error getting total owners count, using fallback:', countError.message);
            totalOwners = await Owner.countDocuments({}).maxTimeMS(5000).catch(() => 0);
        }
        
        // 2. Get recent owners (last 30 days) with fallback
        let recentOwners = 0;
        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            recentOwners = await Owner.countDocuments({
                createdAt: { $gte: thirtyDaysAgo }
            }).maxTimeMS(5000);
            console.log('Recent owners (30 days):', recentOwners);
        } catch (recentError) {
            console.warn('Error getting recent owners count:', recentError.message);
        }
        
        // 3. Get monthly trend with fallback
        let monthlyTrend = [];
        try {
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            
            const pipeline = [
                {
                    $match: {
                        createdAt: { $gte: sixMonthsAgo }
                    }
                },
                {
                    $project: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        _id: 0
                    }
                },
                {
                    $group: {
                        _id: { 
                            year: "$year",
                            month: "$month"
                        },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } },
                { $limit: 6 } // Ensure we don't return too much data
            ];
            
            const result = await Owner.aggregate(pipeline).allowDiskUse(true).maxTimeMS(10000);
            
            monthlyTrend = result.map(item => ({
                year: item._id.year,
                month: item._id.month,
                count: item.count
            }));
            
        } catch (aggError) {
            console.warn('Error in aggregation pipeline, using fallback:', aggError.message);
            // Fallback to simple count if aggregation fails
            monthlyTrend = [
                { year: new Date().getFullYear(), month: new Date().getMonth() + 1, count: recentOwners }
            ];
        }
        
        // Prepare response
        const response = {
            success: true,
            data: {
                total: totalOwners,
                recent: recentOwners,
                monthlyTrend: monthlyTrend
            }
        };
        
        console.log('Sending stats response');
        return res.status(200).json(response);
        
    } catch (error) {
        console.error('Critical error in getOwnerStats:', error);
        
        // Fallback response if everything else fails
        const fallbackResponse = {
            success: true,
            data: {
                total: 0,
                recent: 0,
                monthlyTrend: []
            }
        };
        
        return res.status(200).json(fallbackResponse);
    }
};

>>>>>>> feature/backup-changes
module.exports = {
    registerOwner,
    getOwner,
    getAllOwner,
    updateOwner,
<<<<<<< HEAD
    deleteOwner
}
=======
    deleteOwner,
    getOwnerStats
};
>>>>>>> feature/backup-changes
