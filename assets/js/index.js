// Verify jsPDF loaded correctly
window.addEventListener('load', function() {
  setTimeout(function() {
    if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
      console.error('jsPDF failed to load properly');
    } else {
      console.log('jsPDF loaded successfully');
    }
  }, 1000);
});

// Utilities (global)
function showNotification(message, type) {
  type = type || 'info';

  var notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  // Set background color based on type
  if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
  } else if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  } else {
    notification.style.background = 'linear-gradient(135deg, #ff6b4c 0%, #ff8f70 100%)';
  }

  document.body.appendChild(notification);

  setTimeout(function() {
    notification.classList.add('show');
  }, 100);

  setTimeout(function() {
    notification.classList.remove('show');
    setTimeout(function() {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function formatNumberInput(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function parseNumberInput(value) {
  return parseFloat(value.replace(/,/g, '')) || 0;
}

// Expose globally
window.showNotification = showNotification;
window.formatCurrency = formatCurrency;
window.formatNumberInput = formatNumberInput;
window.parseNumberInput = parseNumberInput;

// Pain point maps (global)
window.painPointMapping = {
  1: ["aws", "ao", "co", "csp"],
  2: ["copilot"],
  3: ["lo", "ea", "la"],
  4: ["as", "ea"],
  5: ["cm", "ao", "aws"],
  6: ["csp", "co", "ao"],
  7: ["ds", "tp"],
  8: ["ps"]
};

window.painPointNames = {
  1: "Cloud Cost Chaos",
  2: "AI Overwhelm",
  3: "License Complexity",
  4: "Audit Anxiety",
  5: "Cloud Migration Mayhem",
  6: "CSP Confusion",
  7: "Security Threats",
  8: "Microsoft Support Bottlenecks"
};

window.painPointTransforms = {
  1: { challenge: "Cloud Cost Chaos", resolved: "Cloud Cost Control" },
  2: { challenge: "AI Overwhelm", resolved: "AI Confidence" },
  3: { challenge: "License Complexity", resolved: "License Mastery" },
  4: { challenge: "Audit Anxiety", resolved: "Audit Excellence" },
  5: { challenge: "Cloud Migration Mayhem", resolved: "Cloud Migration Momentum" },
  6: { challenge: "CSP Confusion", resolved: "CSP Clarity" },
  7: { challenge: "Security Threats", resolved: "Security Strength" },
  8: { challenge: "Microsoft Support Bottlenecks", resolved: "Microsoft Support Agility" }
};

// Calculation function (global)
function calculateServiceData(seats) {
  var calculations = {};

  calculations.ds = {
    breachAvoided: seats * 165 * 0.27 * 0.40,
    complianceSavings: seats * 0.2 * 50,
    total: 0
  };
  calculations.ds.total = calculations.ds.breachAvoided + calculations.ds.complianceSavings;

  calculations.tp = {
    probabilityWeighted: seats * 200 * 0.30,
    avoidedCost: 0,
    total: 0
  };
  calculations.tp.avoidedCost = calculations.tp.probabilityWeighted * 0.35;
  calculations.tp.total = calculations.tp.avoidedCost;

  calculations.ps = {
    ticketCost: (seats * 20 / 100) * 400,
    timeSaved: 0,
    total: 0
  };
  calculations.ps.timeSaved = calculations.ps.ticketCost * 0.40;
  calculations.ps.total = calculations.ps.timeSaved;

  calculations.cm = {
    infraSavings: seats * 1475 * 0.40,
    userProductivity: seats * 75000 * 0.03,
    total: 0
  };
  calculations.cm.total = calculations.cm.infraSavings + calculations.cm.userProductivity;

  calculations.ao = {
    itOpsSavings: seats * 2 * 60,
    governanceSavings: seats * 1200 * 0.12,
    total: 0
  };
  calculations.ao.total = calculations.ao.itOpsSavings + calculations.ao.governanceSavings;

  calculations.co = {
    wasteSavings: seats * 1200 * 0.2,
    costAvoidance: seats * 1200 * 0.05,
    total: 0
  };
  calculations.co.total = calculations.co.wasteSavings + calculations.co.costAvoidance;

  calculations.aws = {
    billingDiscount: seats * 600 * 0.02,
    optimizationSavings: seats * 600 * 0.98 * 0.15,
    total: 0
  };
  calculations.aws.total = calculations.aws.billingDiscount + calculations.aws.optimizationSavings;

  calculations.lo = {
    licenseSavings: seats * 1200 * 0.25,
    complianceAvoidance: seats * 1200 * 0.05,
    total: 0
  };
  calculations.lo.total = calculations.lo.licenseSavings + calculations.lo.complianceAvoidance;

  calculations.la = {
    costAvoidance: seats * 1200 * 0.04,
    adminSavings: seats * 0.0432 * 60,
    total: 0
  };
  calculations.la.total = calculations.la.costAvoidance + calculations.la.adminSavings;

  calculations.as = {
    auditSavings: seats * 2500 * 0.68 * 0.15 * 0.60,
    adminSavings: seats * .3 * 60,
    total: 0
  };
  calculations.as.total = calculations.as.auditSavings + calculations.as.adminSavings;

  calculations.ea = {
    licenseOptimization: seats * 1200 * 0.30,
    adminSavings: seats * 0.1 * 60,
    total: 0
  };
  calculations.ea.total = calculations.ea.licenseOptimization + calculations.ea.adminSavings;

  calculations.copilot = {
    timeValueUplift: (seats * 75000 * 0.05 / 12) * 1.5,
    fullScalePotential: seats * 75000 * 0.05,
    total: 0
  };
  calculations.copilot.total = calculations.copilot.timeValueUplift;

  // CSP Care Pack - adjust calculation based on M365 selection
  var hasM365 = window.userSelections && window.userSelections.technologies && window.userSelections.technologies.indexOf('M365') !== -1;
  calculations.csp = {
    bundledServices: 0,
    cspDiscount: seats * 120,
    total: 0
  };

  // Base services that apply regardless of M365
  var supportValue = seats * 12; // Support services
  var advisoryValue = seats * 6; // Advisory services

  if (hasM365) {
    // Include Security and Copilot services if M365 is selected
    var securityValue = seats * 17.82; // Security services for M365
    var copilotValue = seats * 937.5; // Copilot services for M365
    calculations.csp.bundledServices = securityValue + supportValue + advisoryValue + copilotValue;
  } else {
    // Only include Support and Advisory services if no M365
    calculations.csp.bundledServices = supportValue + advisoryValue;
  }

  calculations.csp.total = calculations.csp.bundledServices + calculations.csp.cspDiscount;

  return calculations;
}

window.calculateServiceData = calculateServiceData;

// Initialization and event listeners
document.addEventListener('DOMContentLoaded', function() {
  if (typeof updateProgressBar === 'function') updateProgressBar();
  if (typeof updatePainPointCardStates === 'function') updatePainPointCardStates();
  if (typeof updateTechCardStates === 'function') updateTechCardStates();
  if (typeof updateEACardStates === 'function') updateEACardStates();

  // Challenge checkboxes
  for (var i = 1; i <= 8; i++) {
    (function(index) {
      var painPointCard = document.getElementById('painPoint' + index + 'Card');
      var painPointCheckbox = document.getElementById('painPoint' + index + 'Checkbox');

      if (painPointCard && painPointCheckbox) {
        var label = painPointCard.querySelector('label');
        if (label) {
          label.style.pointerEvents = 'none';
        }

        painPointCheckbox.style.pointerEvents = 'auto';

        painPointCard.addEventListener('click', function(e) {
          e.stopPropagation();
          painPointCheckbox.checked = !painPointCheckbox.checked;
          if (typeof updatePainPointCardStates === 'function') updatePainPointCardStates();

          if (window.analytics) {
            window.analytics.trackPainPointSelection(
              index,
              painPointCheckbox.checked,
              {
                painPoints: typeof getSelectedPainPoints === 'function' ? getSelectedPainPoints() : [],
                technologies: typeof getSelectedTechnologies === 'function' ? getSelectedTechnologies() : [],
                hasEA: typeof getEAStatus === 'function' ? getEAStatus() : null,
                seats: parseNumberInput(document.getElementById('seatsQuestionnaire')?.value || '0')
              }
            );
          }
        });

        painPointCheckbox.addEventListener('click', function(e) {
          e.stopPropagation();
          if (typeof updatePainPointCardStates === 'function') updatePainPointCardStates();
        });
      }
    })(i);
  }

  // Continue button from challenges to questionnaire
  var continueToEnvBtn = document.getElementById('continueToEnvironment');
  if (continueToEnvBtn) {
    continueToEnvBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof continueToEnvironment === 'function') continueToEnvironment();
    });
  } else {
    console.error('Continue button not found');
  }

  // Back button
  var backToChallengesBtn = document.getElementById('backToChallenges');
  if (backToChallengesBtn) {
    backToChallengesBtn.addEventListener('click', function() {
      var questionnaire = document.getElementById('questionnaireSection');
      var painPoints = document.getElementById('painPointsSection');
      if (questionnaire) questionnaire.style.display = 'none';
      if (painPoints) painPoints.style.display = 'block';
      if (typeof updateProgressBar === 'function') { window.currentStep = 1; updateProgressBar(); }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Edit button from questionnaire
  var editFromQuestionnaireBtn = document.getElementById('editFromQuestionnaire');
  if (editFromQuestionnaireBtn && typeof editFromQuestionnaire === 'function') {
    editFromQuestionnaireBtn.addEventListener('click', editFromQuestionnaire);
  }

  // Tech checkboxes
  var techCheckboxes = ['azure', 'm365', 'aws', 'google', 'microsoft', 'ibm', 'oracle', 'sap', 'servicenow'];
  for (var j = 0; j < techCheckboxes.length; j++) {
    (function(tech) {
      var card = document.getElementById(tech + 'Card');
      var checkbox = document.getElementById(tech + 'Checkbox');

      if (card && checkbox) {
        var label = card.querySelector('label');
        if (label) {
          label.style.pointerEvents = 'none';
        }

        checkbox.style.pointerEvents = 'auto';

        card.addEventListener('click', function(e) {
          e.stopPropagation();
          checkbox.checked = !checkbox.checked;
          if (typeof updateTechCardStates === 'function') updateTechCardStates();

          if (window.analytics) {
            const techMap = {
              'azure': 'Azure', 'm365': 'M365', 'aws': 'AWS', 'google': 'Google',
              'microsoft': 'Microsoft', 'ibm': 'IBM', 'oracle': 'Oracle',
              'sap': 'SAP', 'servicenow': 'ServiceNow'
            };
            window.analytics.trackTechnologySelection(
              techMap[tech] || tech,
              checkbox.checked,
              {
                painPoints: typeof getSelectedPainPoints === 'function' ? getSelectedPainPoints() : [],
                technologies: typeof getSelectedTechnologies === 'function' ? getSelectedTechnologies() : [],
                hasEA: typeof getEAStatus === 'function' ? getEAStatus() : null,
                seats: parseNumberInput(document.getElementById('seatsQuestionnaire')?.value || '0')
              }
            );
          }
        });

        checkbox.addEventListener('click', function(e) {
          e.stopPropagation();
          if (typeof updateTechCardStates === 'function') updateTechCardStates();
        });
      }
    })(techCheckboxes[j]);
  }

  // EA radio buttons
  var eaYes = document.getElementById('eaYes');
  var eaNo = document.getElementById('eaNo');
  var eaYesCard = document.getElementById('eaYesCard');
  var eaNoCard = document.getElementById('eaNoCard');

  if (eaYes) eaYes.addEventListener('change', function(){ if (typeof updateEACardStates === 'function') updateEACardStates(); });
  if (eaNo) eaNo.addEventListener('change', function(){ if (typeof updateEACardStates === 'function') updateEACardStates(); });

  if (eaYesCard && eaYes) {
    var labelYes = eaYesCard.querySelector('label');
    if (labelYes) {
      labelYes.style.pointerEvents = 'none';
    }
    eaYes.style.pointerEvents = 'auto';

    eaYesCard.addEventListener('click', function(e) {
      e.stopPropagation();
      eaYes.checked = true;
      if (typeof updateEACardStates === 'function') updateEACardStates();
    });

    eaYes.addEventListener('click', function(e) {
      e.stopPropagation();
      if (typeof updateEACardStates === 'function') updateEACardStates();
    });
  }

  if (eaNoCard && eaNo) {
    var labelNo = eaNoCard.querySelector('label');
    if (labelNo) {
      labelNo.style.pointerEvents = 'none';
    }
    eaNo.style.pointerEvents = 'auto';

    eaNoCard.addEventListener('click', function(e) {
      e.stopPropagation();
      eaNo.checked = true;
      if (typeof updateEACardStates === 'function') updateEACardStates();
    });

    eaNo.addEventListener('click', function(e) {
      e.stopPropagation();
      if (typeof updateEACardStates === 'function') updateEACardStates();
    });
  }

  // Continue button from environment to results
  var continueToResultsBtn = document.getElementById('continueToResults');
  if (continueToResultsBtn && typeof calculateImpact === 'function') {
    continueToResultsBtn.addEventListener('click', calculateImpact);
  }

  // Edit button
  var editBtn = document.getElementById('editSelections');
  if (editBtn && typeof editSelections === 'function') {
    editBtn.addEventListener('click', editSelections);
  }

  // CTA button handler
  var scheduleCallBtn = document.getElementById('scheduleCall');
  if (scheduleCallBtn) {
    scheduleCallBtn.addEventListener('click', function(){ if (typeof scheduleCall === 'function') scheduleCall(); });
  }

  // Seats input formatting
  var seatsInput = document.getElementById('seatsQuestionnaire');
  if (seatsInput) {
    seatsInput.addEventListener('input', function(e) {
      var value = parseNumberInput(e.target.value);
      if (!isNaN(value) && value >= 0) {
        e.target.value = formatNumberInput(value);
      }
    });

    seatsInput.addEventListener('blur', function(e) {
      var value = parseNumberInput(e.target.value);
      if (!isNaN(value) && value >= 0) {
        e.target.value = formatNumberInput(value);
      }
    });
  }
});

// Selection state and helpers (global)
window.userSelections = {
  painPoints: [],
  technologies: [],
  hasEA: null
};
window.currentStep = 1;
window.totalSteps = 3;

function updateProgressBar() {
  var progressPercentage = (currentStep / totalSteps) * 100;
  var el = document.getElementById('progressBar');
  if (el) el.style.width = progressPercentage + '%';
}

function updatePainPointCardStates() {
  for (var i = 1; i <= 8; i++) {
    var card = document.getElementById('painPoint' + i + 'Card');
    var checkbox = document.getElementById('painPoint' + i + 'Checkbox');
    if (card && checkbox) {
      if (checkbox.checked) card.classList.add('active');
      else card.classList.remove('active');
    }
  }
}

function updateTechCardStates() {
  var techOptions = ['azure', 'm365', 'aws', 'google', 'microsoft', 'ibm', 'oracle', 'sap', 'servicenow'];
  for (var i = 0; i < techOptions.length; i++) {
    var option = techOptions[i];
    var card = document.getElementById(option + 'Card');
    var checkbox = document.getElementById(option + 'Checkbox');
    if (card && checkbox) {
      if (checkbox.checked) card.classList.add('active');
      else card.classList.remove('active');
    }
  }
}

function updateEACardStates() {
  var eaYes = document.getElementById('eaYes');
  var eaNo = document.getElementById('eaNo');
  var eaYesCard = document.getElementById('eaYesCard');
  var eaNoCard = document.getElementById('eaNoCard');
  if (!eaYesCard || !eaNoCard) return;
  if (eaYes && eaYes.checked) {
    eaYesCard.classList.add('active');
    eaNoCard.classList.remove('active');
  } else if (eaNo && eaNo.checked) {
    eaNoCard.classList.add('active');
    eaYesCard.classList.remove('active');
  } else {
    eaYesCard.classList.remove('active');
    eaNoCard.classList.remove('active');
  }
}

function getSelectedPainPoints() {
  var selected = [];
  for (var i = 1; i <= 8; i++) {
    var checkbox = document.getElementById('painPoint' + i + 'Checkbox');
    if (checkbox && checkbox.checked) selected.push(i);
  }
  return selected;
}

function getSelectedTechnologies() {
  var selected = [];
  var techMap = {
    'azureCheckbox': 'Azure',
    'm365Checkbox': 'M365',
    'awsCheckbox': 'AWS',
    'googleCheckbox': 'Google',
    'microsoftCheckbox': 'Microsoft',
    'ibmCheckbox': 'IBM',
    'oracleCheckbox': 'Oracle',
    'sapCheckbox': 'SAP',
    'servicenowCheckbox': 'ServiceNow'
  };
  var checkboxIds = Object.keys(techMap);
  for (var i = 0; i < checkboxIds.length; i++) {
    var checkboxId = checkboxIds[i];
    var checkbox = document.getElementById(checkboxId);
    if (checkbox && checkbox.checked) selected.push(techMap[checkboxId]);
  }
  return selected;
}

function getEAStatus() {
  var eaYes = document.getElementById('eaYes');
  var eaNo = document.getElementById('eaNo');
  if (eaYes && eaYes.checked) return true;
  if (eaNo && eaNo.checked) return false;
  return null;
}

function populateSummary() {
  var painPointTexts = userSelections.painPoints.map(function(id) {
    return window.painPointTransforms[id].challenge;
  });
  var painPointsText = painPointTexts.join(', ');
  var elPain = document.getElementById('painPointsSummary');
  if (elPain) elPain.textContent = painPointsText || 'None selected';

  var techText = userSelections.technologies.join(', ');
  var elTech = document.getElementById('techSummary');
  if (elTech) elTech.textContent = techText;

  var eaText = userSelections.hasEA ? 'Yes' : 'No';
  var elEa = document.getElementById('eaSummary');
  if (elEa) elEa.textContent = eaText;

  var seatsEl = document.getElementById('seatsQuestionnaire');
  var seats = seatsEl ? seatsEl.value : '';
  var elSize = document.getElementById('sizeSummary');
  if (elSize) elSize.textContent = seats + ' users';
}

function showSummary() {
  populateSummary();
  var el = document.getElementById('selectionsSummary');
  if (el) el.style.display = 'block';
}

function hideSummary() {
  var el = document.getElementById('selectionsSummary');
  if (el) el.style.display = 'none';
}

function editSelections() {
  hideSummary();
  var questionnaire = document.getElementById('questionnaireSection');
  var painPoints = document.getElementById('painPointsSection');
  var results = document.getElementById('resultsSection');
  if (questionnaire) questionnaire.style.display = 'none';
  if (painPoints) painPoints.style.display = 'block';
  if (results) results.classList.remove('visible');
  window.currentStep = 1;
  updateProgressBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function editFromQuestionnaire() {
  var questionnaire = document.getElementById('questionnaireSection');
  var painPoints = document.getElementById('painPointsSection');
  if (questionnaire) questionnaire.style.display = 'none';
  if (painPoints) painPoints.style.display = 'block';
  window.currentStep = 1;
  updateProgressBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function continueToEnvironment() {
  userSelections.painPoints = getSelectedPainPoints();
  if (userSelections.painPoints.length === 0) {
    showNotification('Please select at least one challenge.', 'error');
    return;
  }
  var painPointTexts = userSelections.painPoints.map(function(id) {
    return window.painPointTransforms[id].challenge;
  });
  var painPointsText = painPointTexts.join(', ');
  var elSum = document.getElementById('questionnairePainPointsSummary');
  if (elSum) elSum.textContent = painPointsText;
  var painSection = document.getElementById('painPointsSection');
  var questionnaire = document.getElementById('questionnaireSection');
  if (painSection) painSection.style.display = 'none';
  if (questionnaire) questionnaire.style.display = 'block';
  window.currentStep = 2;
  updateProgressBar();
}

// Expose helpers
window.updateProgressBar = updateProgressBar;
window.updatePainPointCardStates = updatePainPointCardStates;
window.updateTechCardStates = updateTechCardStates;
window.updateEACardStates = updateEACardStates;
window.getSelectedPainPoints = getSelectedPainPoints;
window.getSelectedTechnologies = getSelectedTechnologies;
window.getEAStatus = getEAStatus;
window.populateSummary = populateSummary;
window.showSummary = showSummary;
window.hideSummary = hideSummary;
window.editSelections = editSelections;
window.editFromQuestionnaire = editFromQuestionnaire;
window.continueToEnvironment = continueToEnvironment;

// Service catalog (global)
window.serviceData = {
  ds: {
    name: "M365 Data Security & Governance",
    solution: "Crayon's M365 Data Security and Governance offer helps you find and fix hidden data risks in Microsoft 365—so you can stop guessing, start protecting, and feel confident about compliance.",
    requiredTech: ["M365"]
  },
  tp: {
    name: "M365 Threat Protection",
    solution: "Crayon's Threat Protection helps overwhelmed teams stay ahead of fast-moving cyber threats by delivering expert-driven, real-time defense—so you don't have to do it all alone.",
    requiredTech: ["M365"]
  },
  ps: {
    name: "Premium Support",
    solution: "Premium Support gives you direct access to the right people, faster resolutions, and proactive guidance—so you can stay focused on your work, not your support tickets.",
    requiredTech: ["Azure", "M365", "Microsoft"]
  },
  cm: {
    name: "Cloud Migration (Azure & M365)",
    solution: "Crayon takes the confusion out of cloud migration—giving you a clear, guided path from outdated infrastructure to a smarter, scalable future.",
    requiredTech: ["Azure", "M365"]
  },
  ao: {
    name: "Azure Operate",
    solution: "Azure Operate powered by ePlus takes the complexity out of managing Azure by handling operations, governance, and cost control—so you can stay focused on innovation, not infrastructure.",
    requiredTech: ["Azure"]
  },
  co: {
    name: "Cloud Optimization",
    solution: "Crayon's Cloud Optimization offer helps customers see where their money is going, cut waste, and make smarter choices—so they get more value from the cloud.",
    requiredTech: ["Azure", "M365", "AWS", "Google"]
  },
  aws: {
    name: "AWS CloudSmart",
    solution: "Crayon's AWS CloudSmart delivers immediate billing discounts, ongoing optimization savings, and expert advisory services—so you get more value from every AWS dollar spent.",
    requiredTech: ["AWS"]
  },
  lo: {
    name: "License Optimization",
    solution: "Crayon's License Optimization helps you reduce software costs, eliminate waste, and ensure compliance—delivering measurable savings on your software investments.",
    requiredTech: ["Azure", "M365", "Microsoft", "AWS", "IBM", "Oracle", "SAP", "ServiceNow"]
  },
  la: {
    name: "License Advisory",
    solution: "Crayon's License Advisory provides expert guidance for renewals, true-ups, and ongoing compliance—helping you avoid costs and reduce administrative burden.",
    requiredTech: ["Azure", "M365", "Microsoft", "AWS", "IBM", "Oracle", "SAP", "ServiceNow"]
  },
  as: {
    name: "Audit Support",
    solution: "Crayon's Audit Support helps you prepare for and navigate vendor audits with confidence—reducing true-up costs and minimizing internal resource drain.",
    requiredTech: ["Azure", "M365", "Microsoft", "AWS", "IBM", "Oracle", "SAP", "ServiceNow"]
  },
  ea: {
    name: "EA Managed Service",
    solution: "Crayon's EA Managed Service handles your entire Enterprise Agreement lifecycle—delivering significant license savings and freeing your team from administrative overhead.",
    requiredTech: ["Azure", "M365", "Microsoft"],
    requiresEA: true
  },
  copilot: {
    name: "M365 Copilot Adoption & Readiness",
    solution: "Crayon's M365 Copilot Adoption & Readiness accelerates your deployment timeline and increases productive usage—helping you realize Copilot's productivity benefits faster and more effectively.",
    requiredTech: ["M365"]
  },
  csp: {
    name: "CSP Care Pack",
    solution: "Crayon's CSP Care Pack bundles essential services with CSP pricing advantages—delivering integrated support, security, advisory, and AI readiness with additional cost savings.",
    requiredTech: ["Azure"]
  }
};

function getPainPointsForService(serviceKey, userPainPoints) {
  var addressedPainPoints = [];
  for (var i = 0; i < userPainPoints.length; i++) {
    var painPoint = userPainPoints[i];
    var serviceKeys = window.painPointMapping[painPoint];
    if (serviceKeys && serviceKeys.indexOf(serviceKey) !== -1) {
      addressedPainPoints.push(window.painPointNames[painPoint]);
    }
  }
  return addressedPainPoints;
}
window.getPainPointsForService = getPainPointsForService;


function calculatePreviewImpact(selectedPainPoints) {
    // Average customer profile: 1000 seats, Azure + M365 + IBM, No EA
    var avgSeats = 1000;
    var avgTech = ['Azure', 'M365', 'IBM'];
    var avgHasEA = false;

    // Get recommended services based on pain points
    var recommendedServiceKeys = new Set();
    for (var i = 0; i < selectedPainPoints.length; i++) {
      var painPoint = selectedPainPoints[i];
      var serviceKeys = painPointMapping[painPoint];
      if (serviceKeys) {
        for (var j = 0; j < serviceKeys.length; j++) {
          recommendedServiceKeys.add(serviceKeys[j]);
        }
      }
    }

    // Filter services based on average tech stack
    var validServices = [];
    var allServiceKeys = Object.keys(serviceData);

    for (var k = 0; k < allServiceKeys.length; k++) {
      var key = allServiceKeys[k];
      var service = serviceData[key];

      if (!recommendedServiceKeys.has(key)) {
        continue;
      }

      var isCompatible = false;
      for (var m = 0; m < avgTech.length; m++) {
        var tech = avgTech[m];
        for (var n = 0; n < service.requiredTech.length; n++) {
          if (service.requiredTech[n] === tech) {
            isCompatible = true;
            break;
          }
        }
        if (isCompatible) break;
      }

      if (service.requiresEA && !avgHasEA) {
        isCompatible = false;
      }

      if (isCompatible) {
        validServices.push({
          key: key,
          name: service.name
        });
      }
    }

    // Apply CSP bundling logic
    var hasCSP = false;
    var cspPainPoints = [1, 6]; // Cloud Cost Chaos and CSP Confusion
    var supportPainPoints = [8]; // Microsoft Support Bottlenecks
    var advisoryPainPoints = [3]; // License Complexity

    // Check if CSP Care Pack is in valid services
    for (var p = 0; p < validServices.length; p++) {
      if (validServices[p].key === 'csp') {
        hasCSP = true;
        break;
      }
    }

    if (hasCSP) {
      // Check if user selected CSP-related pain points AND support/advisory pain points
      var hasCSPPainPoints = cspPainPoints.some(function(painPoint) {
        return selectedPainPoints.indexOf(painPoint) !== -1;
      });

      var hasSupportPainPoints = supportPainPoints.some(function(painPoint) {
        return selectedPainPoints.indexOf(painPoint) !== -1;
      });

      var hasAdvisoryPainPoints = advisoryPainPoints.some(function(painPoint) {
        return selectedPainPoints.indexOf(painPoint) !== -1;
      });

      // Filter out individual services that are included in CSP Care Pack
      validServices = validServices.filter(function(service) {
        // Always remove M365 Data Security & Governance and M365 Copilot if CSP is present
        if (service.key === 'ds' || service.key === 'copilot') {
          return false;
        }

        // Remove Premium Support if user has CSP pain points AND support pain points
        if (service.key === 'ps' && hasCSPPainPoints && hasSupportPainPoints) {
          return false;
        }

        // Remove License Advisory if user has CSP pain points AND advisory pain points
        if (service.key === 'la' && hasCSPPainPoints && hasAdvisoryPainPoints) {
          return false;
        }

        return true;
      });
    }

    // Calculate impact for valid services
    var tempUserSelections = userSelections.technologies;
    userSelections.technologies = avgTech; // Temporarily set for CSP calculation
    var calculations = calculateServiceData(avgSeats);
    userSelections.technologies = tempUserSelections; // Restore

    var totalImpact = 0;
    for (var q = 0; q < validServices.length; q++) {
      var serviceKey = validServices[q].key;
      if (calculations[serviceKey]) {
        totalImpact += calculations[serviceKey].total;
      }
    }

    return totalImpact;
  }

  function calculateImpact() {
    userSelections.technologies = getSelectedTechnologies();
    userSelections.hasEA = getEAStatus();

    if (userSelections.technologies.length === 0) {
      showNotification('Please select at least one technology option.', 'error');
      return;
    }

    if (userSelections.hasEA === null) {
      showNotification('Please select whether you have an Enterprise Agreement.', 'error');
      return;
    }

    document.getElementById('questionnaireSection').style.display = 'none';
    showSummary();

    var recommendedServiceKeys = new Set();
    for (var j = 0; j < userSelections.painPoints.length; j++) {
      var painPoint = userSelections.painPoints[j];
      var serviceKeys = painPointMapping[painPoint];
      if (serviceKeys) {
        for (var k = 0; k < serviceKeys.length; k++) {
          recommendedServiceKeys.add(serviceKeys[k]);
        }
      }
    }

    var validServices = [];
    var allServiceKeys = Object.keys(serviceData);

    for (var m = 0; m < allServiceKeys.length; m++) {
      var key = allServiceKeys[m];
      var service = serviceData[key];

      if (!recommendedServiceKeys.has(key)) {
        continue;
      }

      var isCompatible = false;
      for (var n = 0; n < userSelections.technologies.length; n++) {
        var userTech = userSelections.technologies[n];
        for (var o = 0; o < service.requiredTech.length; o++) {
          if (service.requiredTech[o] === userTech) {
            isCompatible = true;
            break;
          }
        }
        if (isCompatible) break;
      }

      if (service.requiresEA && !userSelections.hasEA) {
        isCompatible = false;
      }

      if (isCompatible) {
        validServices.push({
          key: key,
          name: service.name,
          data: null
        });
      }
    }

    // CSP Care Pack bundling logic
    var hasCSP = false;
    var cspPainPoints = [1, 6]; // Cloud Cost Chaos and CSP Confusion
    var supportPainPoints = [8]; // Microsoft Support Bottlenecks
    var advisoryPainPoints = [3]; // License Complexity

    // Check if CSP Care Pack is in valid services
    for (var p = 0; p < validServices.length; p++) {
      if (validServices[p].key === 'csp') {
        hasCSP = true;
        break;
      }
    }

    if (hasCSP) {
      // Check if user selected CSP-related pain points AND support/advisory pain points
      var hasCSPPainPoints = cspPainPoints.some(function(painPoint) {
        return userSelections.painPoints.indexOf(painPoint) !== -1;
      });

      var hasSupportPainPoints = supportPainPoints.some(function(painPoint) {
        return userSelections.painPoints.indexOf(painPoint) !== -1;
      });

      var hasAdvisoryPainPoints = advisoryPainPoints.some(function(painPoint) {
        return userSelections.painPoints.indexOf(painPoint) !== -1;
      });

      // Filter out individual services that are included in CSP Care Pack
      validServices = validServices.filter(function(service) {
        // Always remove M365 Data Security & Governance and M365 Copilot if CSP is present
        if (service.key === 'ds' || service.key === 'copilot') {
          return false;
        }

        // Remove Premium Support if user has CSP pain points AND support pain points
        if (service.key === 'ps' && hasCSPPainPoints && hasSupportPainPoints) {
          return false;
        }

        // Remove License Advisory if user has CSP pain points AND advisory pain points
        if (service.key === 'la' && hasCSPPainPoints && hasAdvisoryPainPoints) {
          return false;
        }

        return true;
      });
    }

    if (validServices.length === 0) {
      showNotification('No compatible services found for your selection.', 'error');
      return;
    }

    var seats = parseNumberInput(document.getElementById('seatsQuestionnaire').value);
    var calculations = calculateServiceData(seats);

    for (var q = 0; q < validServices.length; q++) {
      validServices[q].data = calculations[validServices[q].key];
    }

    validServices.sort(function(a, b) {
      return b.data.total - a.data.total;
    });

    for (var r = 0; r < validServices.length; r++) {
      validServices[r].rank = r + 1;
    }

    generateResults(validServices, seats);
  }

  function buildMetricsBreakdown(serviceKey, data, seats) {
    var breakdowns = {
      ds: [
        {
          value: formatCurrency(data.breachAvoided),
          description: '$165/user breach cost, 27% probability, 40% risk reduction',
          source: '<a href="https://www.ibm.com/reports/data-breach" target="_blank">IBM Data Breach Report 2024</a>'
        },
        {
          value: formatCurrency(data.complianceSavings),
          description: '0.2 hours saved per user/year, $50/hour IT rate',
          source: '<a href="https://www.microsoft.com/en-us/security/business/forrester-tei-study" target="_blank">Forrester TEI</a>'
        }
      ],
      tp: [
        {
          value: formatCurrency(data.probabilityWeighted),
          description: '$200/user incident cost, 30% probability',
          source: '<a href="https://www.ibm.com/reports/data-breach" target="_blank">IBM Data Breach Report</a>'
        },
        {
          value: '35% risk reduction',
          description: 'Risk reduction with M365 Threat Protection',
          source: '<a href="https://www.microsoft.com/en-us/security/business/forrester-tei-study" target="_blank">Forrester TEI</a>'
        }
      ],
      ps: [
        {
          value: formatCurrency(data.ticketCost),
          description: '20 tickets per 100 users/year, $400 downtime cost',
          source: '<a href="https://tei.forrester.com/go/microsoft/unified/?lang=en-us&tei=true" target="_blank">Forrester</a>'
        },
        {
          value: '40% time savings',
          description: 'Resolution time reduction with Premium Support',
          source: '<a href="https://tei.forrester.com/go/microsoft/unified/?lang=en-us&tei=true" target="_blank">Microsoft TEI</a>'
        }
      ],
      cm: [
        {
          value: formatCurrency(data.infraSavings),
          description: '$1,475/user/year on-premises cost, 40% savings',
          source: '<a href="https://www.cgi.com/sites/default/files/2024-10/cgi-idc-business-value-migrating-modernizing-microsoft-azure.pdf" target="_blank">IDC Azure Study</a>'
        },
        {
          value: formatCurrency(data.userProductivity),
          description: '3% productivity gain on $75K salary',
          source: '<a href="https://tei.forrester.com/go/microsoft/365Business/?lang=en-us" target="_blank">Forrester TEI</a>'
        }
      ],
      ao: [
        {
          value: formatCurrency(data.itOpsSavings),
          description: '2 hours saved per user/year, $60/hour IT rate',
          source: '<a href="https://tei.forrester.com/go/microsoft/AzureCostEfficiency/docs/The_Total_Economic_Impact_Of_Microsoft_Azure_Solutions_That_Enhance_Cost_Efficiency.pdf" target="_blank">Forrester TEI of Azure</a>'
        },
        {
          value: formatCurrency(data.governanceSavings),
          description: '$1,200/user Azure spend, 12% governance savings',
          source: '<a href="https://info.flexera.com/CM-REPORT-State-of-the-Cloud" target="_blank">Flexera Report</a>'
        }
      ],
      co: [
        {
          value: formatCurrency(data.wasteSavings),
          description: '$1,200/user cloud spend, 20% waste reduction',
          source: '<a href="https://info.flexera.com/CM-REPORT-State-of-the-Cloud" target="_blank">Flexera Report</a>'
        },
        {
          value: formatCurrency(data.costAvoidance),
          description: '5% proactive cost avoidance on cloud spend',
          source: '<a href="https://info.idc.com/rs/081-ATC-910/images/IDC-Control-Cloud-Costs-and-Expand-Transparency-with-FinOps-AP.pdf" target="_blank">IDC Study</a>'
        }
      ],
      aws: [
        {
          value: formatCurrency(data.billingDiscount),
          description: '$600/user AWS spend, 2% immediate billing discount',
          source: '<a href="https://www.crayon.com" target="_blank">Crayon Brochure</a>'
        },
        {
          value: formatCurrency(data.optimizationSavings),
          description: '15% ongoing optimization savings',
          source: '<a href="https://info.flexera.com/CM-REPORT-State-of-the-Cloud" target="_blank">Flexera Report</a>'
        }
      ],
      lo: [
        {
          value: formatCurrency(data.licenseSavings),
          description: '$1,200/user annual license spend, 25% savings',
          source: '<a href="https://info.flexera.com/ITAM-REPORT-State-of-IT-Asset-Management" target="_blank">Flexera ITAM</a>'
        },
        {
          value: formatCurrency(data.complianceAvoidance),
          description: '5% compliance risk avoidance',
          source: '<a href="https://info.flexera.com/ITAM-REPORT-State-of-IT-Asset-Management" target="_blank">Flexera ITAM</a>'
        }
      ],
      la: [
        {
          value: formatCurrency(data.costAvoidance),
          description: '$1,200/user license spend, 4% cost avoidance',
          source: '<a href="https://info.flexera.com/ITAM-REPORT-State-of-IT-Asset-Management" target="_blank">Flexera ITAM</a>'
        },
        {
          value: formatCurrency(data.adminSavings),
          description: (seats * 0.0432).toFixed(0) + ' hours saved annually, $60/hour IT rate',
          source: '<a href="https://info.flexera.com/ITAM-REPORT-State-of-IT-Asset-Management" target="_blank">Flexera ITAM</a>'
        }
      ],
      as: [
        {
          value: formatCurrency(data.auditSavings),
          description: '68% audit chance, 15% avg true-up, 60% cost avoidance',
          source: '<a href="https://www.gartner.com/en/documents/2835817" target="_blank">Gartner Report</a>'
        },
        {
          value: formatCurrency(data.adminSavings),
          description: (seats * .3).toFixed(0) + ' hours saved annually, $60/hour IT rate',
          source: '<a href="https://www.gartner.com/en/documents/2835817" target="_blank">Gartner Report</a>'
        }
      ],
      ea: [
        {
          value: formatCurrency(data.licenseOptimization),
          description: '$1,200/user license spend, 30% optimization savings',
          source: '<a href="https://info.flexera.com/ITAM-REPORT-State-of-IT-Asset-Management" target="_blank">Flexera ITAM</a>'
        },
        {
          value: formatCurrency(data.adminSavings),
          description: (seats * 0.1).toFixed(0) + ' hours saved annually, $60/hour IT rate',
          source: 'Forrester TEI, Gartner SAM Reports'
        }
      ],
      copilot: [
        {
          value: formatCurrency(data.timeValueUplift),
          description: '1.5 month acceleration of 5% productivity gains',
          source: '<a href="https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us" target="_blank">Forrester TEI Copilot</a>'
        },
        {
          value: 'Full potential: ' + formatCurrency(data.fullScalePotential) + '/year',
          description: 'Total annual productivity value with complete adoption',
          source: '<a href="https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us" target="_blank">Forrester TEI</a>'
        }
      ],
      csp: [
        {
          value: formatCurrency(data.bundledServices),
          description: userSelections.technologies.indexOf('M365') !== -1 ? 
            'Combined value: Security + Support + Advisory + Copilot readiness' : 
            'Combined value: Support + Advisory services',
          source: '<a href="https://www.ibm.com/reports/data-breach" target="_blank">IBM Report</a>'
        },
        {
          value: formatCurrency(data.cspDiscount),
          description: '10% CSP discount vs EA pricing on $1,200/user spend',
          source: '<a href="https://www.crayon.com" target="_blank">Crayon CSP Brochure</a>'
        }
      ]
    };
    return breakdowns[serviceKey] || [];
  }

  function generateResults(sortedServices, seats) {
    var totalImpact = 0;

    for (var i = 0; i < sortedServices.length; i++) {
      totalImpact += sortedServices[i].data.total;
    }

    // Update hero impact display
    document.getElementById('heroImpactDisplay').textContent = formatCurrency(totalImpact);

    // Update context
    var techList = userSelections.technologies.join(', ');
    document.getElementById('impactContext').textContent = 'For ' + seats.toLocaleString() + ' users with ' + techList;

    // Populate conquered pain points
    var painPointsList = document.getElementById('conqueredPainPointsList');
    painPointsList.innerHTML = '';

    // Store observer setup for after initial render
    var observerSetupData = [];

    for (var p = 0; p < userSelections.painPoints.length; p++) {
      var painPointId = userSelections.painPoints[p];
      var painPointDiv = document.createElement('div');
      painPointDiv.className = 'pain-point-item';
      painPointDiv.style.animationDelay = (p * 0.1 + 1) + 's';
      painPointDiv.setAttribute('data-pain-point-id', painPointId);

      var transform = painPointTransforms[painPointId];

      // Initially show only the challenge text
      var textSpan = document.createElement('span');
      textSpan.className = 'pain-point-text';
      textSpan.innerHTML = '<span class="challenge-text">' + transform.challenge + '</span>';

      painPointDiv.appendChild(textSpan);
      painPointsList.appendChild(painPointDiv);

      // Store data for later observer setup
      observerSetupData.push({
        element: painPointDiv,
        transform: transform
      });
    }

    // Set up the transformation after a delay to ensure proper rendering
    setTimeout(function() {
      // Add resolved text to each item
      observerSetupData.forEach(function(data) {
        var textSpan = data.element.querySelector('.pain-point-text');
        var resolvedSpan = document.createElement('span');
        resolvedSpan.className = 'resolved-text';

        var parts = data.transform.resolved.split(' ');
        var baseText = parts.slice(0, -1).join(' ');
        var lastWord = parts[parts.length - 1];

        resolvedSpan.innerHTML = baseText + ' <span class="resolved-word">' + lastWord + '</span>';
        textSpan.appendChild(resolvedSpan);
      });

      // Set up the Intersection Observer with a delay to avoid initial trigger
      setTimeout(function() {
        var transformTriggered = false;
        var conqueredSection = document.querySelector('.conquered-pain-points');

        if (conqueredSection) {
          var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              // Only trigger if scrolling down (not on initial load)
              if (entry.isIntersecting && !transformTriggered && entry.intersectionRatio > 0) {
                transformTriggered = true;
                // Add a dramatic pause before transformation
                setTimeout(function() {
                  // Add a pulsing effect to draw attention
                  var allPainPoints = document.querySelectorAll('.pain-point-item');
                  allPainPoints.forEach(function(item, index) {
                    // Stagger the transformations slightly for wave effect
                    setTimeout(function() {
                      item.classList.add('transformed');
                    }, index * 100); // 100ms delay between each item
                  });
                }, 300); // Small delay after section comes into view
              }
            });
          }, {
            threshold: 0.6, // Trigger when 60% of the section is visible
            rootMargin: '0px 0px -100px 0px' // Add negative margin to ensure user has scrolled
          });

          observer.observe(conqueredSection);
        }
      }, 2000); // Wait 2 seconds before setting up observer to avoid initial trigger
    }, 1500); // Wait for initial animations to complete

    var tableContent = document.getElementById('tableContent');
    tableContent.innerHTML = '';

    for (var j = 0; j < sortedServices.length; j++) {
      var service = sortedServices[j];
      var row = document.createElement('div');
      row.className = 'table-row';
      row.style.animationDelay = (j * 0.1 + 1.4) + 's';

      var metricsBreakdown = buildMetricsBreakdown(service.key, service.data, seats);

      var metricsHTML = '';
      for (var k = 0; k < metricsBreakdown.length; k++) {
        var metric = metricsBreakdown[k];
        metricsHTML += '<div class="metric-component"><div class="value">' + metric.value + '</div><div class="description">' + metric.description + '</div><div class="source">' + metric.source + '</div></div>';
      }

      // Get pain points addressed by this service
      var addressedPainPoints = getPainPointsForService(service.key, userSelections.painPoints);
      var painPointsHTML = '';
      for (var p = 0; p < addressedPainPoints.length; p++) {
        painPointsHTML += '<span class="pain-point-tag">' + addressedPainPoints[p] + '</span>';
      }

      // Check if this service should have the MAX IMPACT PACK badge
      var maxImpactServices = ['csp', 'aws', 'ea'];
      var serviceNameHTML = service.name;
      if (maxImpactServices.indexOf(service.key) !== -1) {
        serviceNameHTML += '<div style="background: linear-gradient(135deg, #ff6b4c 0%, #ff8f70 100%); color: white; font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0.5rem; display: inline-block;">MAX IMPACT PACK</div>';
      }

      // Add special styling for top 3 services
      var rankClass = j < 3 ? 'rank-number top-rank' : 'rank-number';

      row.innerHTML = '<div class="' + rankClass + '">' + service.rank + '</div><div class="service-name">' + serviceNameHTML + '</div><div class="pain-points-addressed">' + painPointsHTML + '</div><div class="solution-text">' + serviceData[service.key].solution + '</div><div class="impact-total">' + formatCurrency(service.data.total) + '</div><div class="metrics-breakdown">' + metricsHTML + '</div>';

      tableContent.appendChild(row);
    }

    document.getElementById('resultsSection').classList.add('visible');
    currentStep = 3;
    updateProgressBar();

    // Track calculation completion
    if (window.analytics) {
      window.analytics.trackCalculationCompleted(
        totalImpact,
        sortedServices.length,
        {
          painPoints: userSelections.painPoints,
          technologies: userSelections.technologies,
          hasEA: userSelections.hasEA,
          seats: seats
        }
      );
    }



    // Smooth scroll to results
    setTimeout(function() {
      document.getElementById('resultsSection').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }

  function scrollToDetailsSection() {
    var leadGateSection = document.getElementById('leadGateSection');
    if (leadGateSection) {
      var yOffset = -40; // Reduced cushion to 40px for better visibility
      var y = leadGateSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }

  function handleLeadSubmit() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var company = document.getElementById('company').value;
    var phone = document.getElementById('phone').value;

    // Basic validation
    if (!firstName || !lastName || !email || !company) {
      showNotification('Please fill in all required fields.', 'error');
      return false;
    }

    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return false;
    }

    // Calculate estimated impact for submission
    var estimatedImpact = 0;
    var heroImpactElement = document.getElementById('heroImpactDisplay');
    if (heroImpactElement) {
      var impactText = heroImpactElement.textContent.replace(/[$,]/g, '');
      estimatedImpact = parseFloat(impactText) || 0;
    }

    // Get recommended services
    var recommendedServices = [];

    // Extract service names from the results table if available
    var tableRows = document.querySelectorAll('#tableContent .table-row');
    if (tableRows.length > 0) {
      tableRows.forEach(function(row, index) {
        var serviceNameElement = row.querySelector('.service-name');
        var serviceName = serviceNameElement.textContent.trim();
        // Remove "MAX IMPACT PACK" text if present
        serviceName = serviceName.replace(/MAX IMPACT PACK/g, '').trim();
        recommendedServices.push(serviceName);
      });
    }

    // Prepare lead data
    var leadData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      company: company,
      phone: phone,
      painPoints: userSelections.painPoints || [],
      technologies: userSelections.technologies || [],
      hasEA: userSelections.hasEA,
      seats: parseNumberInput(document.getElementById('seatsQuestionnaire').value),
      estimatedImpact: estimatedImpact,
      recommendedServices: recommendedServices,
      timestamp: new Date().toISOString()
    };

    console.log('Submitting lead data:', leadData);

    // Disable submit button to prevent double submission
    var submitBtn = document.getElementById('submitLead');
    var originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Send data to server
    fetch('submit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData)
    })
    .then(function(response) {
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Always try to get the response body
      return response.text().then(function(text) {
        console.log('Response text:', text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse response as JSON:', e);
          throw new Error('Server returned invalid response: ' + text);
        }

        if (!response.ok) {
          throw new Error(data.message || 'Server error: ' + response.status);
        }

        return data;
      });
    })
    .then(function(data) {
      console.log('Success response:', data);

      if (data.success) {
        // Success - show notification and unlock content
        showNotification('Thank you! Your Detailed Impact Roadmap is ready.', 'success');

        // Track successful form submission
        if (window.analytics) {
          window.analytics.trackFormSubmission('lead_form', true);
        }

        // Hide the gate and show the detailed content
        document.getElementById('leadGateSection').style.display = 'none';
        document.getElementById('gatedContent').classList.add('unlocked');

        // Smooth scroll to the detailed table
        setTimeout(function() {
          var exportableContent = document.getElementById('exportableContent');
          if (exportableContent) {
            exportableContent.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 300);
      } else {
        throw new Error(data.message || 'Submission failed - server returned success: false');
      }
    })
    .catch(function(error) {
      console.error('Error submitting lead:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });

      var errorMessage = 'There was an error submitting your information. Please try again.';
      if (error.message && error.message.length < 100) {
        errorMessage = error.message;
      }

      showNotification(errorMessage, 'error');
    })
    .finally(function() {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });

    return false;
  }

  function generateAndDownloadPDF() {
    console.log('PDF generation started');

    try {
      // Wait a moment for jsPDF to be fully available
      setTimeout(function() {
        // Check if jsPDF is loaded
        if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
          console.error('jsPDF not available:', typeof window.jspdf);
          showNotification('PDF library is loading. Please wait a moment and try again.', 'error');
          return;
        }

        console.log('jsPDF is available, creating document');
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();

        showNotification('Generating PDF report...', 'info');

      // Set up document styling
        var pageWidth = doc.internal.pageSize.getWidth();
        var pageHeight = doc.internal.pageSize.getHeight();
        var margin = 20;
        var lineHeight = 7;
        var yPosition = margin;

        // Helper function to add text with word wrapping
        function addText(text, fontSize, isBold, color) {
          fontSize = fontSize || 12;
          isBold = isBold || false;
          color = color || [0, 0, 0];

          doc.setFontSize(fontSize);
          doc.setFont(undefined, isBold ? 'bold' : 'normal');
          doc.setTextColor(color[0], color[1], color[2]);

          var textLines = doc.splitTextToSize(text, pageWidth - (margin * 2));

          // Check if we need a new page
          if (yPosition + (textLines.length * lineHeight) > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }

          doc.text(textLines, margin, yPosition);
          yPosition += textLines.length * lineHeight + 5;
          return yPosition;
        }

      // Header
        addText('IT Legend Success Plan - Detailed Impact Report', 20, true, [255, 107, 76]);
        yPosition += 5;

        // Get user information
        var firstNameEl = document.getElementById('firstName');
        var lastNameEl = document.getElementById('lastName');
        var companyEl = document.getElementById('company');
        var seatsEl = document.getElementById('seatsQuestionnaire');

        var firstName = firstNameEl ? firstNameEl.value : 'Unknown';
        var lastName = lastNameEl ? lastNameEl.value : 'User';
        var company = companyEl ? companyEl.value : 'Unknown Company';
        var seats = seatsEl ? seatsEl.value : '1,000';

      // Company and user info
        addText('Prepared for: ' + firstName + ' ' + lastName, 14, true);
        addText('Company: ' + company, 12);
        addText('Organization Size: ' + seats + ' users', 12);
        addText('Report Generated: ' + new Date().toLocaleDateString(), 12);
        yPosition += 10;

        // Executive Summary
        addText('Executive Summary', 16, true, [255, 107, 76]);
        yPosition += 5;

        // Get total impact
        var heroImpactElement = document.getElementById('heroImpactDisplay');
        var totalImpact = heroImpactElement ? heroImpactElement.textContent : '$0';
        addText('Estimated Annual Impact: ' + totalImpact, 14, true);

        // Pain Points Conquered
        var painPointElements = document.querySelectorAll('.pain-point-item');
        if (painPointElements.length > 0) {
          addText('Challenges Addressed:', 12, true);
          painPointElements.forEach(function(element) {
            var challengeTextEl = element.querySelector('.challenge-text');
            var challengeText = challengeTextEl ? challengeTextEl.textContent : null;
            if (challengeText) {
              addText('• ' + challengeText, 11);
            }
          });
          yPosition += 5;
        }

        // Technologies
        var techText = userSelections.technologies && userSelections.technologies.length > 0 ? 
                       userSelections.technologies.join(', ') : 'Not specified';
        addText('Technology Stack:', 12, true);
        addText(techText, 11);
        yPosition += 10;

        // Service Recommendations
        addText('Recommended Services & Impact Analysis', 16, true, [255, 107, 76]);
        yPosition += 5;

        // Get table data
        var tableRows = document.querySelectorAll('#tableContent .table-row');

        tableRows.forEach(function(row, index) {
          var rank = index + 1;
          var serviceNameEl = row.querySelector('.service-name');
          var solutionTextEl = row.querySelector('.solution-text');
          var impactTotalEl = row.querySelector('.impact-total');

          var serviceName = serviceNameEl ? serviceNameEl.textContent.replace(/MAX IMPACT PACK/g, '').trim() : null;
          var painPointsEl = row.querySelector('.pain-points-addressed');
          var solutionText = solutionTextEl ? solutionTextEl.textContent : null;
          var impactTotal = impactTotalEl ? impactTotalEl.textContent : null;

          if (serviceName && solutionText && impactTotal) {
            // Service header
            addText(rank + '. ' + serviceName, 13, true);
            addText('Annual Impact: ' + impactTotal, 12, true, [34, 139, 34]);

            // Pain points addressed
            if (painPointsEl) {
              var painPointTags = painPointsEl.querySelectorAll('.pain-point-tag');
              if (painPointTags.length > 0) {
                var painPointsList = [];
                painPointTags.forEach(function(tag) {
                  painPointsList.push(tag.textContent);
                });
                addText('Addresses: ' + painPointsList.join(', '), 10, true, [255, 107, 76]);
              }
            }

            // Solution description
            addText('Solution:', 11, true);
            addText(solutionText, 10);

            // Impact metrics
            var metrics = row.querySelectorAll('.metric-component');
            if (metrics.length > 0) {
              addText('Impact Breakdown:', 11, true);
              metrics.forEach(function(metric) {
                var valueEl = metric.querySelector('.value');
                var descriptionEl = metric.querySelector('.description');
                var value = valueEl ? valueEl.textContent : null;
                var description = descriptionEl ? descriptionEl.textContent : null;
                if (value && description) {
                  addText('• ' + value + ': ' + description, 9);
                }
              });
            }

            yPosition += 10;
          }
        });

        // Next Steps
        if (yPosition > pageHeight - 100) {
          doc.addPage();
          yPosition = margin;
        }

        addText('Next Steps', 16, true, [255, 107, 76]);
        addText('1. Schedule a consultation with Crayon to discuss your specific requirements', 11);
        addText('2. Prioritize services based on your immediate business needs', 11);
        addText('3. Develop an implementation roadmap aligned with your goals', 11);
        addText('4. Begin your journey to becoming an IT Legend!', 11);

        yPosition += 15;
        addText('Contact Information', 14, true);
        addText('Ready to get started? Contact Crayon to schedule your consultation.', 11);
        addText('Visit: www.crayon.com', 11, false, [0, 0, 255]);

        // Generate filename
        var timestamp = new Date().toISOString().split('T')[0];
        var cleanCompany = company.replace(/[^a-zA-Z0-9]/g, '') || 'Company';
        var filename = 'IT-Legend-Report-' + cleanCompany + '-' + timestamp + '.pdf';

        console.log('About to save PDF with filename:', filename);

        // Download the PDF
        doc.save(filename);

        console.log('PDF save command executed');

        // Show success notification after a brief delay to ensure download started
        setTimeout(function() {
          showNotification('PDF report downloaded successfully!', 'success');
        }, 500);

      }, 100); // Small delay to ensure jsPDF is fully ready

    } catch (error) {
      console.error('Error generating PDF:', error);
      console.error('Error stack:', error.stack);
      showNotification('Error generating PDF. Please try again.', 'error');
    }
  }

  function scheduleCall() {
    showNotification('Redirecting to schedule a call...', 'info');
    setTimeout(function() {
      showNotification('Please contact us directly to schedule your consultation.', 'info');
    }, 1000);
  }

  // Expose UI actions used by inline attributes
  window.scrollToDetailsSection = scrollToDetailsSection;
  window.handleLeadSubmit = handleLeadSubmit;
  window.generateAndDownloadPDF = generateAndDownloadPDF;
  window.calculateImpact = calculateImpact;
  window.scheduleCall = scheduleCall;
  window.calculatePreviewImpact = calculatePreviewImpact;

  // moved to assets/js/index.js
  /* document.addEventListener('DOMContentLoaded', function() {
    ...
  }); */