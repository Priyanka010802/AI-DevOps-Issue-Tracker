const Issue = require('../models/Issue');
const { analyzeIssue } = require('../services/aiService');

exports.createIssue = async (req, res) => {
  try {
    const { title, description, project, labels, logs } = req.body;
    
    // Call AI for classification
    const aiAnalysis = await analyzeIssue(title, description);
    
    const issue = await Issue.create({
      title,
      description,
      project,
      createdBy: req.user.id,
      labels: labels || aiAnalysis.suggestedLabels,
      priority: aiAnalysis.priority,
      severity: aiAnalysis.severity,
      aiSummary: aiAnalysis.summary,
      aiSuggestion: aiAnalysis.suggestion,
      aiClassification: {
        category: aiAnalysis.category,
        confidence: 0.9 // Placeholder
      },
      logs
    });

    // Emit real-time update
    const io = req.app.get('socketio');
    io.to(project.toString()).emit('new-issue', issue);

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIssues = async (req, res) => {
  try {
    const { projectId } = req.params;
    const issues = await Issue.find({ project: projectId })
      .populate('assignee', 'name email avatar')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    
    const io = req.app.get('socketio');
    io.to(issue.project.toString()).emit('update-issue', issue);

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
